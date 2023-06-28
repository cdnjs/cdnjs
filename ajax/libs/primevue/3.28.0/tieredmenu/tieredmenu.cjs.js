'use strict';

var BaseComponent = require('primevue/basecomponent');
var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var utils = require('primevue/utils');
var AngleRightIcon = require('primevue/icons/angleright');
var Ripple = require('primevue/ripple');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var AngleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleRightIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script$1 = {
    name: 'TieredMenuSub',
    extends: BaseComponent__default["default"],
    emits: ['item-click', 'item-mouseenter'],
    props: {
        menuId: {
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
            return `${this.menuId}_${processedItem.key}`;
        },
        getItemKey(processedItem) {
            return this.getItemId(processedItem);
        },
        getItemProp(processedItem, name, params) {
            return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
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
            return utils.ObjectUtils.isNotEmpty(processedItem.items);
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
        AngleRightIcon: AngleRightIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

const _hoisted_1$1 = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-level", "aria-setsize", "aria-posinset"];
const _hoisted_2 = ["onClick", "onMouseenter"];
const _hoisted_3 = ["href", "onClick"];
const _hoisted_4 = ["href", "target"];
const _hoisted_5 = ["id"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_AngleRightIcon = vue.resolveComponent("AngleRightIcon");
  const _component_TieredMenuSub = vue.resolveComponent("TieredMenuSub", true);
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createElementBlock("ul", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('menu'))), [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.items, (processedItem, index) => {
      return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: $options.getItemKey(processedItem)
      }, [
        ($options.isItemVisible(processedItem) && !$options.getItemProp(processedItem, 'separator'))
          ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
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
              vue.createElementVNode("div", vue.mergeProps({
                class: "p-menuitem-content",
                onClick: $event => ($options.onItemClick($event, processedItem)),
                onMouseenter: $event => ($options.onItemMouseEnter($event, processedItem))
              }, $options.getPTOptions(processedItem, 'content')), [
                (!$props.templates.item)
                  ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                      ($options.getItemProp(processedItem, 'to') && !$options.isItemDisabled(processedItem))
                        ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                            key: 0,
                            to: $options.getItemProp(processedItem, 'to'),
                            custom: ""
                          }, {
                            default: vue.withCtx(({ navigate, href, isActive, isExactActive }) => [
                              vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
                                href: href,
                                class: $options.getItemActionClass(processedItem, { isActive, isExactActive }),
                                tabindex: "-1",
                                "aria-hidden": "true",
                                onClick: $event => ($options.onItemActionClick($event, navigate))
                              }, $options.getPTOptions(processedItem, 'action')), [
                                ($props.templates.itemicon)
                                  ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
                                      key: 0,
                                      item: processedItem.item,
                                      class: vue.normalizeClass($options.getItemIconClass(processedItem))
                                    }, null, 8, ["item", "class"]))
                                  : ($options.getItemProp(processedItem, 'icon'))
                                    ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                                        key: 1,
                                        class: $options.getItemIconClass(processedItem)
                                      }, $options.getPTOptions(processedItem, 'icon')), null, 16))
                                    : vue.createCommentVNode("", true),
                                vue.createElementVNode("span", vue.mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions(processedItem, 'label')), vue.toDisplayString($options.getItemLabel(processedItem)), 17)
                              ], 16, _hoisted_3)), [
                                [_directive_ripple]
                              ])
                            ]),
                            _: 2
                          }, 1032, ["to"]))
                        : vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
                            key: 1,
                            href: $options.getItemProp(processedItem, 'url'),
                            class: $options.getItemActionClass(processedItem),
                            target: $options.getItemProp(processedItem, 'target'),
                            tabindex: "-1",
                            "aria-hidden": "true"
                          }, $options.getPTOptions(processedItem, 'action')), [
                            ($props.templates.itemicon)
                              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
                                  key: 0,
                                  item: processedItem.item,
                                  class: vue.normalizeClass($options.getItemIconClass(processedItem))
                                }, null, 8, ["item", "class"]))
                              : ($options.getItemProp(processedItem, 'icon'))
                                ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                                    key: 1,
                                    class: $options.getItemIconClass(processedItem)
                                  }, $options.getPTOptions(processedItem, 'icon')), null, 16))
                                : vue.createCommentVNode("", true),
                            vue.createElementVNode("span", vue.mergeProps({ class: "p-menuitem-text" }, $options.getPTOptions(processedItem, 'label')), vue.toDisplayString($options.getItemLabel(processedItem)), 17),
                            ($options.getItemProp(processedItem, 'items'))
                              ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                                  ($props.templates.submenuicon)
                                    ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.submenuicon), vue.mergeProps({
                                        key: 0,
                                        class: "p-submenu-icon",
                                        active: $options.isItemActive(processedItem)
                                      }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16, ["active"]))
                                    : (vue.openBlock(), vue.createBlock(_component_AngleRightIcon, vue.mergeProps({
                                        key: 1,
                                        class: "p-submenu-icon"
                                      }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16))
                                ], 64))
                              : vue.createCommentVNode("", true)
                          ], 16, _hoisted_4)), [
                            [_directive_ripple]
                          ])
                    ], 64))
                  : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
                      key: 1,
                      item: processedItem.item
                    }, null, 8, ["item"]))
              ], 16, _hoisted_2),
              ($options.isItemVisible(processedItem) && $options.isItemGroup(processedItem))
                ? (vue.openBlock(), vue.createBlock(_component_TieredMenuSub, {
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
                    onItemClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('item-click', $event))),
                    onItemMouseenter: _cache[1] || (_cache[1] = $event => (_ctx.$emit('item-mouseenter', $event)))
                  }, null, 8, ["id", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "exact", "level", "pt"]))
                : vue.createCommentVNode("", true)
            ], 16, _hoisted_1$1))
          : vue.createCommentVNode("", true),
        ($options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator'))
          ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
              key: 1,
              id: $options.getItemId(processedItem),
              style: $options.getItemProp(processedItem, 'style'),
              class: $options.getSeparatorItemClass(processedItem),
              role: "separator"
            }, _ctx.ptm('separator')), null, 16, _hoisted_5))
          : vue.createCommentVNode("", true)
      ], 64))
    }), 128))
  ], 16))
}

script$1.render = render$1;

var script = {
    name: 'TieredMenu',
    extends: BaseComponent__default["default"],
    inheritAttrs: false,
    emits: ['focus', 'blur', 'before-show', 'before-hide', 'hide', 'show'],
    props: {
        popup: {
            type: Boolean,
            default: false
        },
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
        exact: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
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
    outsideClickListener: null,
    scrollHandler: null,
    resizeListener: null,
    target: null,
    container: null,
    menubar: null,
    searchTimeout: null,
    searchValue: null,
    data() {
        return {
            id: this.$attrs.id,
            focused: false,
            focusedItemInfo: { index: -1, level: 0, parentKey: '' },
            activeItemPath: [],
            visible: !this.popup,
            dirty: false
        };
    },
    watch: {
        '$attrs.id': function (newValue) {
            this.id = newValue || utils.UniqueComponentId();
        },
        activeItemPath(newPath) {
            if (!this.popup) {
                if (utils.ObjectUtils.isNotEmpty(newPath)) {
                    this.bindOutsideClickListener();
                    this.bindResizeListener();
                } else {
                    this.unbindOutsideClickListener();
                    this.unbindResizeListener();
                }
            }
        }
    },
    mounted() {
        this.id = this.id || utils.UniqueComponentId();
    },
    beforeUnmount() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.container && this.autoZIndex) {
            utils.ZIndexUtils.clear(this.container);
        }

        this.target = null;
        this.container = null;
    },
    methods: {
        getItemProp(item, name) {
            return item ? utils.ObjectUtils.getItemValue(item[name]) : undefined;
        },
        getItemLabel(item) {
            return this.getItemProp(item, 'label');
        },
        isItemDisabled(item) {
            return this.getItemProp(item, 'disabled');
        },
        isItemGroup(item) {
            return utils.ObjectUtils.isNotEmpty(this.getItemProp(item, 'items'));
        },
        isItemSeparator(item) {
            return this.getItemProp(item, 'separator');
        },
        getProccessedItemLabel(processedItem) {
            return processedItem ? this.getItemLabel(processedItem.item) : undefined;
        },
        isProccessedItemGroup(processedItem) {
            return processedItem && utils.ObjectUtils.isNotEmpty(processedItem.items);
        },
        toggle(event) {
            this.visible ? this.hide(event, true) : this.show(event);
        },
        show(event, isFocus) {
            if (this.popup) {
                this.$emit('before-show');
                this.visible = true;
                this.target = this.target || event.currentTarget;
                this.relatedTarget = event.relatedTarget || null;
            }

            this.focusedItemInfo = { index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '' };

            isFocus && utils.DomHandler.focus(this.menubar);
        },
        hide(event, isFocus) {
            if (this.popup) {
                this.$emit('before-hide');
                this.visible = false;
            }

            this.activeItemPath = [];
            this.focusedItemInfo = { index: -1, level: 0, parentKey: '' };

            isFocus && utils.DomHandler.focus(this.relatedTarget || this.target || this.menubar);
            this.dirty = false;
        },
        onFocus(event) {
            this.focused = true;
            this.focusedItemInfo = this.focusedItemInfo.index !== -1 ? this.focusedItemInfo : { index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '' };

            this.$emit('focus', event);
        },
        onBlur(event) {
            this.focused = false;
            this.focusedItemInfo = { index: -1, level: 0, parentKey: '' };
            this.searchValue = '';
            this.dirty = false;
            this.$emit('blur', event);
        },
        onKeyDown(event) {
            if (this.disabled) {
                event.preventDefault();

                return;
            }

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
                    if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
                        this.searchItems(event, event.key);
                    }

                    break;
            }
        },
        onItemChange(event) {
            const { processedItem, isFocus } = event;

            if (utils.ObjectUtils.isEmpty(processedItem)) return;

            const { index, key, level, parentKey, items } = processedItem;
            const grouped = utils.ObjectUtils.isNotEmpty(items);

            const activeItemPath = this.activeItemPath.filter((p) => p.parentKey !== parentKey && p.parentKey !== key);

            grouped && activeItemPath.push(processedItem);

            this.focusedItemInfo = { index, level, parentKey };
            this.activeItemPath = activeItemPath;

            grouped && (this.dirty = true);
            isFocus && utils.DomHandler.focus(this.menubar);
        },
        onOverlayClick(event) {
            OverlayEventBus__default["default"].emit('overlay-click', {
                originalEvent: event,
                target: this.target
            });
        },
        onItemClick(event) {
            const { originalEvent, processedItem } = event;
            const grouped = this.isProccessedItemGroup(processedItem);
            const root = utils.ObjectUtils.isEmpty(processedItem.parent);
            const selected = this.isSelected(processedItem);

            if (selected) {
                const { index, key, level, parentKey } = processedItem;

                this.activeItemPath = this.activeItemPath.filter((p) => key !== p.key && key.startsWith(p.key));
                this.focusedItemInfo = { index, level, parentKey };

                this.dirty = !root;
                utils.DomHandler.focus(this.menubar);
            } else {
                if (grouped) {
                    this.onItemChange(event);
                } else {
                    const rootProcessedItem = root ? processedItem : this.activeItemPath.find((p) => p.parentKey === '');

                    this.hide(originalEvent);
                    this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);

                    utils.DomHandler.focus(this.menubar);
                }
            }
        },
        onItemMouseEnter(event) {
            if (this.dirty) {
                this.onItemChange(event);
            }
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

                this.popup && this.hide(event, true);
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
            const root = utils.ObjectUtils.isEmpty(processedItem.parent);

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
                const element = utils.DomHandler.findSingle(this.menubar, `li[id="${`${this.focusedItemId}`}"]`);
                const anchorElement = element && utils.DomHandler.findSingle(element, '.p-menuitem-link');

                anchorElement ? anchorElement.click() : element && element.click();

                if (!this.popup) {
                    const processedItem = this.visibleItems[this.focusedItemInfo.index];
                    const grouped = this.isProccessedItemGroup(processedItem);

                    !grouped && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());
                }
            }

            event.preventDefault();
        },
        onSpaceKey(event) {
            this.onEnterKey(event);
        },
        onEscapeKey(event) {
            this.hide(event, true);
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
            if (this.autoZIndex) {
                utils.ZIndexUtils.set('menu', el, this.baseZIndex + this.$primevue.config.zIndex.menu);
            }

            this.alignOverlay();
            utils.DomHandler.focus(this.menubar);
            this.scrollInView();
        },
        onAfterEnter() {
            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();

            this.$emit('show');
        },
        onLeave() {
            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();

            this.$emit('hide');
            this.container = null;
            this.dirty = false;
        },
        onAfterLeave(el) {
            if (this.autoZIndex) {
                utils.ZIndexUtils.clear(el);
            }
        },
        alignOverlay() {
            this.container.style.minWidth = utils.DomHandler.getOuterWidth(this.target) + 'px';
            utils.DomHandler.absolutePosition(this.container, this.target);
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    const isOutsideContainer = this.container && !this.container.contains(event.target);
                    const isOutsideTarget = this.popup ? !(this.target && (this.target === event.target || this.target.contains(event.target))) : true;

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
        bindScrollListener() {
            if (!this.scrollHandler) {
                this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.target, (event) => {
                    this.hide(event, true);
                });
            }

            this.scrollHandler.bindScrollListener();
        },
        unbindScrollListener() {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        },
        bindResizeListener() {
            if (!this.resizeListener) {
                this.resizeListener = (event) => {
                    if (!utils.DomHandler.isTouchDevice()) {
                        this.hide(event, true);
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
            return utils.ObjectUtils.findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
        },
        findNextItemIndex(index) {
            const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;

            return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
        },
        findPrevItemIndex(index) {
            const matchedItemIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;

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
            const element = utils.DomHandler.findSingle(this.menubar, `li[id="${id}"]`);

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
        menubarRef(el) {
            this.menubar = el ? el.$el : undefined;
        }
    },
    computed: {
        containerClass() {
            return [
                'p-tieredmenu p-component',
                {
                    'p-tieredmenu-overlay': this.popup,
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        },
        processedItems() {
            return this.createProcessedItems(this.model || []);
        },
        visibleItems() {
            const processedItem = this.activeItemPath.find((p) => p.key === this.focusedItemInfo.parentKey);

            return processedItem ? processedItem.items : this.processedItems;
        },
        focusedItemId() {
            return this.focusedItemInfo.index !== -1 ? `${this.id}${utils.ObjectUtils.isNotEmpty(this.focusedItemInfo.parentKey) ? '_' + this.focusedItemInfo.parentKey : ''}_${this.focusedItemInfo.index}` : null;
        }
    },
    components: {
        TieredMenuSub: script$1,
        Portal: Portal__default["default"]
    }
};

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TieredMenuSub = vue.resolveComponent("TieredMenuSub");
  const _component_Portal = vue.resolveComponent("Portal");

  return (vue.openBlock(), vue.createBlock(_component_Portal, {
    appendTo: $props.appendTo,
    disabled: !$props.popup
  }, {
    default: vue.withCtx(() => [
      vue.createVNode(vue.Transition, {
        name: "p-connected-overlay",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, {
        default: vue.withCtx(() => [
          ($data.visible)
            ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.containerRef,
                id: $data.id,
                class: $options.containerClass,
                onClick: _cache[0] || (_cache[0] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args)))
              }, { ..._ctx.$attrs, ..._ctx.ptm('root') }), [
                vue.createVNode(_component_TieredMenuSub, {
                  ref: $options.menubarRef,
                  id: $data.id + '_list',
                  class: "p-tieredmenu-root-list",
                  tabindex: !$props.disabled ? $props.tabindex : -1,
                  role: "menubar",
                  "aria-label": _ctx.ariaLabel,
                  "aria-labelledby": _ctx.ariaLabelledby,
                  "aria-disabled": $props.disabled || undefined,
                  "aria-orientation": "vertical",
                  "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
                  menuId: $data.id,
                  focusedItemId: $data.focused ? $options.focusedItemId : undefined,
                  items: $options.processedItems,
                  templates: _ctx.$slots,
                  activeItemPath: $data.activeItemPath,
                  exact: $props.exact,
                  level: 0,
                  pt: _ctx.pt,
                  onFocus: $options.onFocus,
                  onBlur: $options.onBlur,
                  onKeydown: $options.onKeyDown,
                  onItemClick: $options.onItemClick,
                  onItemMouseenter: $options.onItemMouseEnter
                }, null, 8, ["id", "tabindex", "aria-label", "aria-labelledby", "aria-disabled", "aria-activedescendant", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "exact", "pt", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter"])
              ], 16, _hoisted_1))
            : vue.createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
    ]),
    _: 1
  }, 8, ["appendTo", "disabled"]))
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

var css_248z = "\n.p-tieredmenu-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-tieredmenu ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.p-tieredmenu .p-submenu-list {\n    position: absolute;\n    min-width: 100%;\n    z-index: 1;\n    display: none;\n}\n.p-tieredmenu .p-menuitem-link {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-tieredmenu .p-menuitem-text {\n    line-height: 1;\n}\n.p-tieredmenu .p-menuitem {\n    position: relative;\n}\n.p-tieredmenu .p-menuitem-link .p-submenu-icon {\n    margin-left: auto;\n}\n.p-tieredmenu .p-menuitem-active > .p-submenu-list {\n    display: block;\n    left: 100%;\n    top: 0;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
