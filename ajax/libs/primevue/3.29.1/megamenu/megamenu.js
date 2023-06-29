this.primevue = this.primevue || {};
this.primevue.megamenu = (function (BaseComponent, utils, AngleDownIcon, AngleRightIcon, Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var AngleDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDownIcon);
    var AngleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleRightIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script$1 = {
        name: 'MegaMenuSub',
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
            horizontal: {
                type: Boolean,
                default: false
            },
            submenu: {
                type: Object,
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
            activeItem: {
                type: Object,
                default: null
            },
            exact: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            getSubListId(processedItem) {
                return `${this.getItemId(processedItem)}_list`;
            },
            getSubListKey(processedItem) {
                return this.getSubListId(processedItem);
            },
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
                return utils.ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
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
            getSubmenuHeaderClass(processedItem) {
                return [
                    'p-megamenu-submenu-header p-submenu-header',
                    this.getItemProp(processedItem, 'class'),
                    {
                        'p-disabled': this.isItemDisabled(processedItem)
                    }
                ];
            },
            getColumnClass(processedItem) {
                let length = this.isItemGroup(processedItem) ? processedItem.items.length : 0;
                let columnClass;

                switch (length) {
                    case 2:
                        columnClass = 'p-megamenu-col-6';
                        break;

                    case 3:
                        columnClass = 'p-megamenu-col-4';
                        break;

                    case 4:
                        columnClass = 'p-megamenu-col-3';
                        break;

                    case 6:
                        columnClass = 'p-megamenu-col-2';
                        break;

                    default:
                        columnClass = 'p-megamenu-col-12';
                        break;
                }

                return columnClass;
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
            AngleRightIcon: AngleRightIcon__default["default"],
            AngleDownIcon: AngleDownIcon__default["default"]
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
      const _component_MegaMenuSub = vue.resolveComponent("MegaMenuSub", true);
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("ul", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('menu'))), [
        ($props.submenu)
          ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
              key: 0,
              class: $options.getSubmenuHeaderClass($props.submenu),
              style: $options.getItemProp($props.submenu, 'style'),
              role: "presentation"
            }, _ctx.ptm('submenuHeader')), vue.toDisplayString($options.getItemLabel($props.submenu)), 17))
          : vue.createCommentVNode("", true),
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
                                ($options.isItemGroup(processedItem))
                                  ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                                      ($props.templates.submenuicon)
                                        ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.submenuicon), vue.mergeProps({
                                            key: 0,
                                            active: $options.isItemActive(processedItem),
                                            class: "p-submenu-icon"
                                          }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16, ["active"]))
                                        : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.horizontal ? 'AngleDownIcon' : 'AngleRightIcon'), vue.mergeProps({
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
                    ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                        key: 0,
                        class: "p-megamenu-panel"
                      }, _ctx.ptm('panel')), [
                        vue.createElementVNode("div", vue.mergeProps({ class: "p-megamenu-grid" }, _ctx.ptm('grid')), [
                          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(processedItem.items, (col) => {
                            return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                              key: $options.getItemKey(col),
                              class: $options.getColumnClass(processedItem)
                            }, _ctx.ptm('column')), [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(col, (submenu) => {
                                return (vue.openBlock(), vue.createBlock(_component_MegaMenuSub, {
                                  key: $options.getSubListKey(submenu),
                                  id: $options.getSubListId(submenu),
                                  role: "menu",
                                  class: "p-submenu-list p-megamenu-submenu",
                                  menuId: $props.menuId,
                                  focusedItemId: $props.focusedItemId,
                                  submenu: submenu,
                                  items: submenu.items,
                                  templates: $props.templates,
                                  exact: $props.exact,
                                  level: $props.level + 1,
                                  pt: _ctx.pt,
                                  onItemClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('item-click', $event))),
                                  onItemMouseenter: _cache[1] || (_cache[1] = $event => (_ctx.$emit('item-mouseenter', $event)))
                                }, null, 8, ["id", "menuId", "focusedItemId", "submenu", "items", "templates", "exact", "level", "pt"]))
                              }), 128))
                            ], 16))
                          }), 128))
                        ], 16)
                      ], 16))
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
        name: 'MegaMenu',
        extends: BaseComponent__default["default"],
        emits: ['focus', 'blur'],
        props: {
            model: {
                type: Array,
                default: null
            },
            orientation: {
                type: String,
                default: 'horizontal'
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
        resizeListener: null,
        container: null,
        menubar: null,
        searchTimeout: null,
        searchValue: null,
        data() {
            return {
                id: this.$attrs.id,
                focused: false,
                focusedItemInfo: { index: -1, key: '', parentKey: '' },
                activeItem: null,
                dirty: false
            };
        },
        watch: {
            '$attrs.id': function (newValue) {
                this.id = newValue || utils.UniqueComponentId();
            },
            activeItem(newItem) {
                if (utils.ObjectUtils.isNotEmpty(newItem)) {
                    this.bindOutsideClickListener();
                    this.bindResizeListener();
                } else {
                    this.unbindOutsideClickListener();
                    this.unbindResizeListener();
                }
            }
        },
        mounted() {
            this.id = this.id || utils.UniqueComponentId();
        },
        beforeUnmount() {
            this.unbindOutsideClickListener();
            this.unbindResizeListener();
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
            hide(event, isFocus) {
                this.activeItem = null;
                this.focusedItemInfo = { index: -1, key: '', parentKey: '' };

                isFocus && utils.DomHandler.focus(this.menubar);
                this.dirty = false;
            },
            onFocus(event) {
                this.focused = true;

                if (this.focusedItemInfo.index === -1) {
                    const index = this.findFirstFocusedItemIndex();
                    const processedItem = this.findVisibleItem(index);

                    this.focusedItemInfo = { index, key: processedItem.key, parentKey: processedItem.parentKey };
                }

                this.$emit('focus', event);
            },
            onBlur(event) {
                this.focused = false;
                this.focusedItemInfo = { index: -1, key: '', parentKey: '' };
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

                const { index, key, parentKey, items } = processedItem;
                const grouped = utils.ObjectUtils.isNotEmpty(items);

                grouped && (this.activeItem = processedItem);
                this.focusedItemInfo = { index, key, parentKey };

                grouped && (this.dirty = true);
                isFocus && utils.DomHandler.focus(this.menubar);
            },
            onItemClick(event) {
                const { originalEvent, processedItem } = event;
                const grouped = this.isProccessedItemGroup(processedItem);
                const root = utils.ObjectUtils.isEmpty(processedItem.parent);
                const selected = this.isSelected(processedItem);

                if (selected) {
                    const { index, key, parentKey } = processedItem;

                    this.activeItem = null;
                    this.focusedItemInfo = { index, key, parentKey };

                    this.dirty = !root;
                    utils.DomHandler.focus(this.menubar);
                } else {
                    if (grouped) {
                        this.onItemChange(event);
                    } else {
                        const rootProcessedItem = root ? processedItem : this.activeItem;

                        this.hide(originalEvent);
                        this.changeFocusedItemInfo(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);

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
                if (this.horizontal) {
                    if (utils.ObjectUtils.isNotEmpty(this.activeItem) && this.activeItem.key === this.focusedItemInfo.key) {
                        this.focusedItemInfo = { index: -1, key: '', parentKey: this.activeItem.key };
                    } else {
                        const processedItem = this.findVisibleItem(this.focusedItemInfo.index);
                        const grouped = this.isProccessedItemGroup(processedItem);

                        if (grouped) {
                            this.onItemChange({ originalEvent: event, processedItem });
                            this.focusedItemInfo = { index: -1, key: processedItem.key, parentKey: processedItem.parentKey };
                            this.searchValue = '';
                        }
                    }
                }

                const itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();

                this.changeFocusedItemInfo(event, itemIndex);
                event.preventDefault();
            },
            onArrowUpKey(event) {
                if (event.altKey && this.horizontal) {
                    if (this.focusedItemInfo.index !== -1) {
                        const processedItem = this.findVisibleItem(this.focusedItemInfo.index);
                        const grouped = this.isProccessedItemGroup(processedItem);

                        if (!grouped && utils.ObjectUtils.isNotEmpty(this.activeItem)) {
                            if (this.focusedItemInfo.index === 0) {
                                this.focusedItemInfo = { index: this.activeItem.index, key: this.activeItem.key, parentKey: this.activeItem.parentKey };
                                this.activeItem = null;
                            } else {
                                this.changeFocusedItemInfo(event, this.findFirstItemIndex());
                            }
                        }
                    }

                    event.preventDefault();
                } else {
                    const itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();

                    this.changeFocusedItemInfo(event, itemIndex);
                    event.preventDefault();
                }
            },
            onArrowLeftKey(event) {
                const processedItem = this.findVisibleItem(this.focusedItemInfo.index);
                const grouped = this.isProccessedItemGroup(processedItem);

                if (grouped) {
                    if (this.horizontal) {
                        const itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();

                        this.changeFocusedItemInfo(event, itemIndex);
                    }
                } else {
                    if (this.vertical && utils.ObjectUtils.isNotEmpty(this.activeItem)) {
                        if (processedItem.columnIndex === 0) {
                            this.focusedItemInfo = { index: this.activeItem.index, key: this.activeItem.key, parentKey: this.activeItem.parentKey };
                            this.activeItem = null;
                        }
                    }

                    const columnIndex = processedItem.columnIndex - 1;
                    const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);

                    itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
                }

                event.preventDefault();
            },
            onArrowRightKey(event) {
                const processedItem = this.findVisibleItem(this.focusedItemInfo.index);
                const grouped = this.isProccessedItemGroup(processedItem);

                if (grouped) {
                    if (this.vertical) {
                        if (utils.ObjectUtils.isNotEmpty(this.activeItem) && this.activeItem.key === processedItem.key) {
                            this.focusedItemInfo = { index: -1, key: '', parentKey: this.activeItem.key };
                        } else {
                            const processedItem = this.findVisibleItem(this.focusedItemInfo.index);
                            const grouped = this.isProccessedItemGroup(processedItem);

                            if (grouped) {
                                this.onItemChange({ originalEvent: event, processedItem });
                                this.focusedItemInfo = { index: -1, key: processedItem.key, parentKey: processedItem.parentKey };
                                this.searchValue = '';
                            }
                        }
                    }

                    const itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();

                    this.changeFocusedItemInfo(event, itemIndex);
                } else {
                    const columnIndex = processedItem.columnIndex + 1;
                    const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);

                    itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
                }

                event.preventDefault();
            },
            onHomeKey(event) {
                this.changeFocusedItemInfo(event, this.findFirstItemIndex());
                event.preventDefault();
            },
            onEndKey(event) {
                this.changeFocusedItemInfo(event, this.findLastItemIndex());
                event.preventDefault();
            },
            onEnterKey(event) {
                if (this.focusedItemInfo.index !== -1) {
                    const element = utils.DomHandler.findSingle(this.menubar, `li[id="${`${this.focusedItemId}`}"]`);
                    const anchorElement = element && utils.DomHandler.findSingle(element, '.p-menuitem-link');

                    anchorElement ? anchorElement.click() : element && element.click();

                    const processedItem = this.visibleItems[this.focusedItemInfo.index];
                    const grouped = this.isProccessedItemGroup(processedItem);

                    !grouped && this.changeFocusedItemInfo(event, this.findFirstFocusedItemIndex());
                }

                event.preventDefault();
            },
            onSpaceKey(event) {
                this.onEnterKey(event);
            },
            onEscapeKey(event) {
                if (utils.ObjectUtils.isNotEmpty(this.activeItem)) {
                    this.focusedItemInfo = { index: this.activeItem.index, key: this.activeItem.key };
                    this.activeItem = null;
                }

                event.preventDefault();
            },
            onTabKey(event) {
                if (this.focusedItemInfo.index !== -1) {
                    const processedItem = this.findVisibleItem(this.focusedItemInfo.index);
                    const grouped = this.isProccessedItemGroup(processedItem);

                    !grouped && this.onItemChange({ originalEvent: event, processedItem });
                }

                this.hide();
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
                return utils.ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
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
            findVisibleItem(index) {
                return utils.ObjectUtils.isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
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
                    this.changeFocusedItemInfo(event, itemIndex);
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
            changeFocusedItemInfo(event, index) {
                const processedItem = this.findVisibleItem(index);

                this.focusedItemInfo.index = index;
                this.focusedItemInfo.key = utils.ObjectUtils.isNotEmpty(processedItem) ? processedItem.key : '';
                this.scrollInView();
            },
            scrollInView(index = -1) {
                const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
                const element = utils.DomHandler.findSingle(this.menubar, `li[id="${id}"]`);

                if (element) {
                    element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
                }
            },
            createProcessedItems(items, level = 0, parent = {}, parentKey = '', columnIndex) {
                const processedItems = [];

                items &&
                    items.forEach((item, index) => {
                        const key = (parentKey !== '' ? parentKey + '_' : '') + (columnIndex !== undefined ? columnIndex + '_' : '') + index;
                        const newItem = {
                            item,
                            index,
                            level,
                            key,
                            parent,
                            parentKey,
                            columnIndex: columnIndex !== undefined ? columnIndex : parent.columnIndex !== undefined ? parent.columnIndex : index
                        };

                        newItem['items'] =
                            level === 0 && item.items && item.items.length > 0 ? item.items.map((_items, _index) => this.createProcessedItems(_items, level + 1, newItem, key, _index)) : this.createProcessedItems(item.items, level + 1, newItem, key);
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
                    'p-megamenu p-component',
                    {
                        'p-megamenu-horizontal': this.horizontal,
                        'p-megamenu-vertical': this.vertical
                    }
                ];
            },
            processedItems() {
                return this.createProcessedItems(this.model || []);
            },
            visibleItems() {
                const processedItem = utils.ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem : null;

                return processedItem && processedItem.key === this.focusedItemInfo.parentKey
                    ? processedItem.items.reduce((items, col) => {
                          col.forEach((submenu) => {
                              submenu.items.forEach((a) => {
                                  items.push(a);
                              });
                          });

                          return items;
                      }, [])
                    : this.processedItems;
            },
            horizontal() {
                return this.orientation === 'horizontal';
            },
            vertical() {
                return this.orientation === 'vertical';
            },
            focusedItemId() {
                return utils.ObjectUtils.isNotEmpty(this.focusedItemInfo.key) ? `${this.id}_${this.focusedItemInfo.key}` : null;
            }
        },
        components: {
            MegaMenuSub: script$1
        }
    };

    const _hoisted_1 = ["id"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_MegaMenuSub = vue.resolveComponent("MegaMenuSub");

      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: $options.containerRef,
        id: $data.id,
        class: $options.containerClass
      }, _ctx.ptm('root')), [
        (_ctx.$slots.start)
          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 0,
              class: "p-megamenu-start"
            }, _ctx.ptm('start')), [
              vue.renderSlot(_ctx.$slots, "start")
            ], 16))
          : vue.createCommentVNode("", true),
        vue.createVNode(_component_MegaMenuSub, {
          ref: $options.menubarRef,
          id: $data.id + '_list',
          class: "p-megamenu-root-list",
          tabindex: !$props.disabled ? $props.tabindex : -1,
          role: "menubar",
          "aria-label": _ctx.ariaLabel,
          "aria-labelledby": _ctx.ariaLabelledby,
          "aria-disabled": $props.disabled || undefined,
          "aria-orientation": $props.orientation,
          "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
          menuId: $data.id,
          focusedItemId: $data.focused ? $options.focusedItemId : undefined,
          items: $options.processedItems,
          horizontal: $options.horizontal,
          templates: _ctx.$slots,
          activeItem: $data.activeItem,
          exact: $props.exact,
          level: 0,
          pt: _ctx.pt,
          onFocus: $options.onFocus,
          onBlur: $options.onBlur,
          onKeydown: $options.onKeyDown,
          onItemClick: $options.onItemClick,
          onItemMouseenter: $options.onItemMouseEnter
        }, null, 8, ["id", "tabindex", "aria-label", "aria-labelledby", "aria-disabled", "aria-orientation", "aria-activedescendant", "menuId", "focusedItemId", "items", "horizontal", "templates", "activeItem", "exact", "pt", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter"]),
        (_ctx.$slots.end)
          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 1,
              class: "p-megamenu-end"
            }, _ctx.ptm('end')), [
              vue.renderSlot(_ctx.$slots, "end")
            ], 16))
          : vue.createCommentVNode("", true)
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

    var css_248z = "\n.p-megamenu {\n    display: flex;\n}\n.p-megamenu-root-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.p-megamenu-root-list > .p-menuitem {\n    position: relative;\n}\n.p-megamenu .p-menuitem-link {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-megamenu .p-menuitem-text {\n    line-height: 1;\n}\n.p-megamenu-panel {\n    display: none;\n    position: absolute;\n    width: auto;\n    z-index: 1;\n}\n.p-megamenu-root-list > .p-menuitem-active > .p-megamenu-panel {\n    display: block;\n}\n.p-megamenu-submenu {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n/* Horizontal */\n.p-megamenu-horizontal {\n    align-items: center;\n}\n.p-megamenu-horizontal .p-megamenu-root-list {\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n}\n.p-megamenu-horizontal .p-megamenu-end {\n    margin-left: auto;\n    align-self: center;\n}\n\n/* Vertical */\n.p-megamenu-vertical {\n    flex-direction: column;\n}\n.p-megamenu-vertical .p-megamenu-root-list {\n    flex-direction: column;\n}\n.p-megamenu-vertical .p-megamenu-root-list > .p-menuitem-active > .p-megamenu-panel {\n    left: 100%;\n    top: 0;\n}\n.p-megamenu-vertical .p-megamenu-root-list > .p-menuitem > .p-menuitem-content > .p-menuitem-link > .p-submenu-icon {\n    margin-left: auto;\n}\n.p-megamenu-grid {\n    display: flex;\n}\n.p-megamenu-col-2,\n.p-megamenu-col-3,\n.p-megamenu-col-4,\n.p-megamenu-col-6,\n.p-megamenu-col-12 {\n    flex: 0 0 auto;\n    padding: 0.5rem;\n}\n.p-megamenu-col-2 {\n    width: 16.6667%;\n}\n.p-megamenu-col-3 {\n    width: 25%;\n}\n.p-megamenu-col-4 {\n    width: 33.3333%;\n}\n.p-megamenu-col-6 {\n    width: 50%;\n}\n.p-megamenu-col-12 {\n    width: 100%;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.utils, primevue.icons.angledown, primevue.icons.angleright, primevue.ripple, Vue);
