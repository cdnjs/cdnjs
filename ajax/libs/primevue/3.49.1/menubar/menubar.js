this.primevue = this.primevue || {};
this.primevue.menubar = (function (BarsIcon, utils, BaseComponent, MenubarStyle, AngleDownIcon, AngleRightIcon, Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BarsIcon__default = /*#__PURE__*/_interopDefaultLegacy(BarsIcon);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var MenubarStyle__default = /*#__PURE__*/_interopDefaultLegacy(MenubarStyle);
    var AngleDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDownIcon);
    var AngleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleRightIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script$2 = {
      name: 'BaseMenubar',
      "extends": BaseComponent__default["default"],
      props: {
        model: {
          type: Array,
          "default": null
        },
        buttonProps: {
          type: null,
          "default": null
        },
        breakpoint: {
          type: String,
          "default": '960px'
        },
        ariaLabelledby: {
          type: String,
          "default": null
        },
        ariaLabel: {
          type: String,
          "default": null
        }
      },
      style: MenubarStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script$1 = {
      name: 'MenubarSub',
      hostName: 'Menubar',
      "extends": BaseComponent__default["default"],
      emits: ['item-mouseenter', 'item-click', 'item-mousemove'],
      props: {
        items: {
          type: Array,
          "default": null
        },
        root: {
          type: Boolean,
          "default": false
        },
        popup: {
          type: Boolean,
          "default": false
        },
        mobileActive: {
          type: Boolean,
          "default": false
        },
        templates: {
          type: Object,
          "default": null
        },
        level: {
          type: Number,
          "default": 0
        },
        menuId: {
          type: String,
          "default": null
        },
        focusedItemId: {
          type: String,
          "default": null
        },
        activeItemPath: {
          type: Object,
          "default": null
        }
      },
      list: null,
      methods: {
        getItemId: function getItemId(processedItem) {
          return "".concat(this.menuId, "_").concat(processedItem.key);
        },
        getItemKey: function getItemKey(processedItem) {
          return this.getItemId(processedItem);
        },
        getItemProp: function getItemProp(processedItem, name, params) {
          return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
        },
        getItemLabel: function getItemLabel(processedItem) {
          return this.getItemProp(processedItem, 'label');
        },
        getItemLabelId: function getItemLabelId(processedItem) {
          return "".concat(this.menuId, "_").concat(processedItem.key, "_label");
        },
        getPTOptions: function getPTOptions(processedItem, index, key) {
          return this.ptm(key, {
            context: {
              item: processedItem,
              index: index,
              active: this.isItemActive(processedItem),
              focused: this.isItemFocused(processedItem),
              disabled: this.isItemDisabled(processedItem),
              level: this.level
            }
          });
        },
        isItemActive: function isItemActive(processedItem) {
          return this.activeItemPath.some(function (path) {
            return path.key === processedItem.key;
          });
        },
        isItemVisible: function isItemVisible(processedItem) {
          return this.getItemProp(processedItem, 'visible') !== false;
        },
        isItemDisabled: function isItemDisabled(processedItem) {
          return this.getItemProp(processedItem, 'disabled');
        },
        isItemFocused: function isItemFocused(processedItem) {
          return this.focusedItemId === this.getItemId(processedItem);
        },
        isItemGroup: function isItemGroup(processedItem) {
          return utils.ObjectUtils.isNotEmpty(processedItem.items);
        },
        onItemClick: function onItemClick(event, processedItem) {
          this.getItemProp(processedItem, 'command', {
            originalEvent: event,
            item: processedItem.item
          });
          this.$emit('item-click', {
            originalEvent: event,
            processedItem: processedItem,
            isFocus: true
          });
        },
        onItemMouseEnter: function onItemMouseEnter(event, processedItem) {
          this.$emit('item-mouseenter', {
            originalEvent: event,
            processedItem: processedItem
          });
        },
        onItemMouseMove: function onItemMouseMove(event, processedItem) {
          this.$emit('item-mousemove', {
            originalEvent: event,
            processedItem: processedItem
          });
        },
        getAriaSetSize: function getAriaSetSize() {
          var _this = this;
          return this.items.filter(function (processedItem) {
            return _this.isItemVisible(processedItem) && !_this.getItemProp(processedItem, 'separator');
          }).length;
        },
        getAriaPosInset: function getAriaPosInset(index) {
          var _this2 = this;
          return index - this.items.slice(0, index).filter(function (processedItem) {
            return _this2.isItemVisible(processedItem) && _this2.getItemProp(processedItem, 'separator');
          }).length + 1;
        },
        getMenuItemProps: function getMenuItemProps(processedItem, index) {
          return {
            action: vue.mergeProps({
              "class": this.cx('action'),
              tabindex: -1,
              'aria-hidden': true
            }, this.getPTOptions(processedItem, index, 'action')),
            icon: vue.mergeProps({
              "class": [this.cx('icon'), this.getItemProp(processedItem, 'icon')]
            }, this.getPTOptions(processedItem, index, 'icon')),
            label: vue.mergeProps({
              "class": this.cx('label')
            }, this.getPTOptions(processedItem, index, 'label')),
            submenuicon: vue.mergeProps({
              "class": this.cx('submenuIcon')
            }, this.getPTOptions(processedItem, index, 'submenuIcon'))
          };
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

    var _hoisted_1$1 = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-level", "aria-setsize", "aria-posinset", "data-p-highlight", "data-p-focused", "data-p-disabled"];
    var _hoisted_2 = ["onClick", "onMouseenter", "onMousemove"];
    var _hoisted_3 = ["href", "target"];
    var _hoisted_4 = ["id"];
    var _hoisted_5 = ["id"];
    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_MenubarSub = vue.resolveComponent("MenubarSub", true);
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
        "class": $props.level === 0 ? _ctx.cx('menu') : _ctx.cx('submenu')
      }, $props.level === 0 ? _ctx.ptm('menu') : _ctx.ptm('submenu')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.items, function (processedItem, index) {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: $options.getItemKey(processedItem)
        }, [$options.isItemVisible(processedItem) && !$options.getItemProp(processedItem, 'separator') ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
          key: 0,
          id: $options.getItemId(processedItem),
          style: $options.getItemProp(processedItem, 'style'),
          "class": [_ctx.cx('menuitem', {
            processedItem: processedItem
          }), $options.getItemProp(processedItem, 'class')],
          role: "menuitem",
          "aria-label": $options.getItemLabel(processedItem),
          "aria-disabled": $options.isItemDisabled(processedItem) || undefined,
          "aria-expanded": $options.isItemGroup(processedItem) ? $options.isItemActive(processedItem) : undefined,
          "aria-haspopup": $options.isItemGroup(processedItem) && !$options.getItemProp(processedItem, 'to') ? 'menu' : undefined,
          "aria-level": $props.level + 1,
          "aria-setsize": $options.getAriaSetSize(),
          "aria-posinset": $options.getAriaPosInset(index)
        }, $options.getPTOptions(processedItem, index, 'menuitem'), {
          "data-p-highlight": $options.isItemActive(processedItem),
          "data-p-focused": $options.isItemFocused(processedItem),
          "data-p-disabled": $options.isItemDisabled(processedItem)
        }), [vue.createElementVNode("div", vue.mergeProps({
          "class": _ctx.cx('content'),
          onClick: function onClick($event) {
            return $options.onItemClick($event, processedItem);
          },
          onMouseenter: function onMouseenter($event) {
            return $options.onItemMouseEnter($event, processedItem);
          },
          onMousemove: function onMousemove($event) {
            return $options.onItemMouseMove($event, processedItem);
          }
        }, $options.getPTOptions(processedItem, index, 'content')), [!$props.templates.item ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
          key: 0,
          href: $options.getItemProp(processedItem, 'url'),
          "class": _ctx.cx('action'),
          target: $options.getItemProp(processedItem, 'target'),
          tabindex: "-1",
          "aria-hidden": "true"
        }, $options.getPTOptions(processedItem, index, 'action')), [$props.templates.itemicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
          key: 0,
          item: processedItem.item,
          "class": vue.normalizeClass(_ctx.cx('icon'))
        }, null, 8, ["item", "class"])) : $options.getItemProp(processedItem, 'icon') ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 1,
          "class": [_ctx.cx('icon'), $options.getItemProp(processedItem, 'icon')]
        }, $options.getPTOptions(processedItem, index, 'icon')), null, 16)) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
          id: $options.getItemLabelId(processedItem),
          "class": _ctx.cx('label')
        }, $options.getPTOptions(processedItem, index, 'label')), vue.toDisplayString($options.getItemLabel(processedItem)), 17, _hoisted_4), $options.getItemProp(processedItem, 'items') ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 2
        }, [$props.templates.submenuicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.submenuicon), {
          key: 0,
          root: $props.root,
          active: $options.isItemActive(processedItem),
          "class": vue.normalizeClass(_ctx.cx('submenuIcon'))
        }, null, 8, ["root", "active", "class"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.root ? 'AngleDownIcon' : 'AngleRightIcon'), vue.mergeProps({
          key: 1,
          "class": _ctx.cx('submenuIcon')
        }, $options.getPTOptions(processedItem, index, 'submenuIcon')), null, 16, ["class"]))], 64)) : vue.createCommentVNode("", true)], 16, _hoisted_3)), [[_directive_ripple]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
          key: 1,
          item: processedItem.item,
          root: $props.root,
          hasSubmenu: $options.getItemProp(processedItem, 'items'),
          label: $options.getItemLabel(processedItem),
          props: $options.getMenuItemProps(processedItem, index)
        }, null, 8, ["item", "root", "hasSubmenu", "label", "props"]))], 16, _hoisted_2), $options.isItemVisible(processedItem) && $options.isItemGroup(processedItem) ? (vue.openBlock(), vue.createBlock(_component_MenubarSub, {
          key: 0,
          menuId: $props.menuId,
          role: "menu",
          style: vue.normalizeStyle(_ctx.sx('submenu', true, {
            processedItem: processedItem
          })),
          focusedItemId: $props.focusedItemId,
          items: processedItem.items,
          mobileActive: $props.mobileActive,
          activeItemPath: $props.activeItemPath,
          templates: $props.templates,
          level: $props.level + 1,
          "aria-labelledby": $options.getItemLabelId(processedItem),
          pt: _ctx.pt,
          unstyled: _ctx.unstyled,
          onItemClick: _cache[0] || (_cache[0] = function ($event) {
            return _ctx.$emit('item-click', $event);
          }),
          onItemMouseenter: _cache[1] || (_cache[1] = function ($event) {
            return _ctx.$emit('item-mouseenter', $event);
          }),
          onItemMousemove: _cache[2] || (_cache[2] = function ($event) {
            return _ctx.$emit('item-mousemove', $event);
          })
        }, null, 8, ["menuId", "style", "focusedItemId", "items", "mobileActive", "activeItemPath", "templates", "level", "aria-labelledby", "pt", "unstyled"])) : vue.createCommentVNode("", true)], 16, _hoisted_1$1)) : vue.createCommentVNode("", true), $options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator') ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
          key: 1,
          id: $options.getItemId(processedItem),
          "class": [_ctx.cx('separator'), $options.getItemProp(processedItem, 'class')],
          style: $options.getItemProp(processedItem, 'style'),
          role: "separator"
        }, _ctx.ptm('separator')), null, 16, _hoisted_5)) : vue.createCommentVNode("", true)], 64);
      }), 128))], 16);
    }

    script$1.render = render$1;

    var script = {
      name: 'Menubar',
      "extends": script$2,
      inheritAttrs: false,
      emits: ['focus', 'blur'],
      matchMediaListener: null,
      data: function data() {
        return {
          id: this.$attrs.id,
          mobileActive: false,
          focused: false,
          focusedItemInfo: {
            index: -1,
            level: 0,
            parentKey: ''
          },
          activeItemPath: [],
          dirty: false,
          query: null,
          queryMatches: false
        };
      },
      watch: {
        '$attrs.id': function $attrsId(newValue) {
          this.id = newValue || utils.UniqueComponentId();
        },
        activeItemPath: function activeItemPath(newPath) {
          if (utils.ObjectUtils.isNotEmpty(newPath)) {
            this.bindOutsideClickListener();
            this.bindResizeListener();
          } else {
            this.unbindOutsideClickListener();
            this.unbindResizeListener();
          }
        }
      },
      outsideClickListener: null,
      container: null,
      menubar: null,
      mounted: function mounted() {
        this.id = this.id || utils.UniqueComponentId();
        this.bindMatchMediaListener();
      },
      beforeUnmount: function beforeUnmount() {
        this.mobileActive = false;
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        this.unbindMatchMediaListener();
        if (this.container) {
          utils.ZIndexUtils.clear(this.container);
        }
        this.container = null;
      },
      methods: {
        getItemProp: function getItemProp(item, name) {
          return item ? utils.ObjectUtils.getItemValue(item[name]) : undefined;
        },
        getItemLabel: function getItemLabel(item) {
          return this.getItemProp(item, 'label');
        },
        isItemDisabled: function isItemDisabled(item) {
          return this.getItemProp(item, 'disabled');
        },
        isItemGroup: function isItemGroup(item) {
          return utils.ObjectUtils.isNotEmpty(this.getItemProp(item, 'items'));
        },
        isItemSeparator: function isItemSeparator(item) {
          return this.getItemProp(item, 'separator');
        },
        getProccessedItemLabel: function getProccessedItemLabel(processedItem) {
          return processedItem ? this.getItemLabel(processedItem.item) : undefined;
        },
        isProccessedItemGroup: function isProccessedItemGroup(processedItem) {
          return processedItem && utils.ObjectUtils.isNotEmpty(processedItem.items);
        },
        toggle: function toggle(event) {
          var _this = this;
          if (this.mobileActive) {
            this.mobileActive = false;
            utils.ZIndexUtils.clear(this.menubar);
            this.hide();
          } else {
            this.mobileActive = true;
            utils.ZIndexUtils.set('menu', this.menubar, this.$primevue.config.zIndex.menu);
            setTimeout(function () {
              _this.show();
            }, 1);
          }
          this.bindOutsideClickListener();
          event.preventDefault();
        },
        show: function show() {
          utils.DomHandler.focus(this.menubar);
        },
        hide: function hide(event, isFocus) {
          var _this2 = this;
          if (this.mobileActive) {
            this.mobileActive = false;
            setTimeout(function () {
              utils.DomHandler.focus(_this2.$refs.menubutton);
            }, 0);
          }
          this.activeItemPath = [];
          this.focusedItemInfo = {
            index: -1,
            level: 0,
            parentKey: ''
          };
          isFocus && utils.DomHandler.focus(this.menubar);
          this.dirty = false;
        },
        onFocus: function onFocus(event) {
          this.focused = true;
          if (!this.popup) {
            this.focusedItemInfo = this.focusedItemInfo.index !== -1 ? this.focusedItemInfo : {
              index: this.findFirstFocusedItemIndex(),
              level: 0,
              parentKey: ''
            };
          }
          this.$emit('focus', event);
        },
        onBlur: function onBlur(event) {
          this.focused = false;
          this.focusedItemInfo = {
            index: -1,
            level: 0,
            parentKey: ''
          };
          this.searchValue = '';
          this.dirty = false;
          this.$emit('blur', event);
        },
        onKeyDown: function onKeyDown(event) {
          var metaKey = event.metaKey || event.ctrlKey;
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
            case 'NumpadEnter':
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
        onItemChange: function onItemChange(event) {
          var processedItem = event.processedItem,
            isFocus = event.isFocus;
          if (utils.ObjectUtils.isEmpty(processedItem)) return;
          var index = processedItem.index,
            key = processedItem.key,
            level = processedItem.level,
            parentKey = processedItem.parentKey,
            items = processedItem.items;
          var grouped = utils.ObjectUtils.isNotEmpty(items);
          var activeItemPath = this.activeItemPath.filter(function (p) {
            return p.parentKey !== parentKey && p.parentKey !== key;
          });
          grouped && activeItemPath.push(processedItem);
          this.focusedItemInfo = {
            index: index,
            level: level,
            parentKey: parentKey
          };
          this.activeItemPath = activeItemPath;
          grouped && (this.dirty = true);
          isFocus && utils.DomHandler.focus(this.menubar);
        },
        onItemClick: function onItemClick(event) {
          var originalEvent = event.originalEvent,
            processedItem = event.processedItem;
          var grouped = this.isProccessedItemGroup(processedItem);
          var root = utils.ObjectUtils.isEmpty(processedItem.parent);
          var selected = this.isSelected(processedItem);
          if (selected) {
            var index = processedItem.index,
              key = processedItem.key,
              level = processedItem.level,
              parentKey = processedItem.parentKey;
            this.activeItemPath = this.activeItemPath.filter(function (p) {
              return key !== p.key && key.startsWith(p.key);
            });
            this.focusedItemInfo = {
              index: index,
              level: level,
              parentKey: parentKey
            };
            this.dirty = !root;
            utils.DomHandler.focus(this.menubar);
          } else {
            if (grouped) {
              this.onItemChange(event);
            } else {
              var rootProcessedItem = root ? processedItem : this.activeItemPath.find(function (p) {
                return p.parentKey === '';
              });
              this.hide(originalEvent);
              this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);
              this.mobileActive = false;
              utils.DomHandler.focus(this.menubar);
            }
          }
        },
        onItemMouseEnter: function onItemMouseEnter(event) {
          if (!this.mobileActive && this.dirty) {
            this.onItemChange(event);
          }
        },
        onItemMouseMove: function onItemMouseMove(event) {
          if (this.focused) {
            this.changeFocusedItemIndex(event, event.processedItem.index);
          }
        },
        menuButtonClick: function menuButtonClick(event) {
          this.toggle(event);
        },
        menuButtonKeydown: function menuButtonKeydown(event) {
          (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') && this.menuButtonClick(event);
        },
        onArrowDownKey: function onArrowDownKey(event) {
          var processedItem = this.visibleItems[this.focusedItemInfo.index];
          var root = processedItem ? utils.ObjectUtils.isEmpty(processedItem.parent) : null;
          if (root) {
            var grouped = this.isProccessedItemGroup(processedItem);
            if (grouped) {
              this.onItemChange({
                originalEvent: event,
                processedItem: processedItem
              });
              this.focusedItemInfo = {
                index: -1,
                parentKey: processedItem.key
              };
              this.onArrowRightKey(event);
            }
          } else {
            var itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();
            this.changeFocusedItemIndex(event, itemIndex);
          }
          event.preventDefault();
        },
        onArrowUpKey: function onArrowUpKey(event) {
          var _this3 = this;
          var processedItem = this.visibleItems[this.focusedItemInfo.index];
          var root = utils.ObjectUtils.isEmpty(processedItem.parent);
          if (root) {
            var grouped = this.isProccessedItemGroup(processedItem);
            if (grouped) {
              this.onItemChange({
                originalEvent: event,
                processedItem: processedItem
              });
              this.focusedItemInfo = {
                index: -1,
                parentKey: processedItem.key
              };
              var itemIndex = this.findLastItemIndex();
              this.changeFocusedItemIndex(event, itemIndex);
            }
          } else {
            var parentItem = this.activeItemPath.find(function (p) {
              return p.key === processedItem.parentKey;
            });
            if (this.focusedItemInfo.index === 0) {
              this.focusedItemInfo = {
                index: -1,
                parentKey: parentItem ? parentItem.parentKey : ''
              };
              this.searchValue = '';
              this.onArrowLeftKey(event);
              this.activeItemPath = this.activeItemPath.filter(function (p) {
                return p.parentKey !== _this3.focusedItemInfo.parentKey;
              });
            } else {
              var _itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();
              this.changeFocusedItemIndex(event, _itemIndex);
            }
          }
          event.preventDefault();
        },
        onArrowLeftKey: function onArrowLeftKey(event) {
          var _this4 = this;
          var processedItem = this.visibleItems[this.focusedItemInfo.index];
          var parentItem = processedItem ? this.activeItemPath.find(function (p) {
            return p.key === processedItem.parentKey;
          }) : null;
          if (parentItem) {
            this.onItemChange({
              originalEvent: event,
              processedItem: parentItem
            });
            this.activeItemPath = this.activeItemPath.filter(function (p) {
              return p.parentKey !== _this4.focusedItemInfo.parentKey;
            });
            event.preventDefault();
          } else {
            var itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();
            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
          }
        },
        onArrowRightKey: function onArrowRightKey(event) {
          var processedItem = this.visibleItems[this.focusedItemInfo.index];
          var parentItem = processedItem ? this.activeItemPath.find(function (p) {
            return p.key === processedItem.parentKey;
          }) : null;
          if (parentItem) {
            var grouped = this.isProccessedItemGroup(processedItem);
            if (grouped) {
              this.onItemChange({
                originalEvent: event,
                processedItem: processedItem
              });
              this.focusedItemInfo = {
                index: -1,
                parentKey: processedItem.key
              };
              this.onArrowDownKey(event);
            }
          } else {
            var itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();
            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
          }
        },
        onHomeKey: function onHomeKey(event) {
          this.changeFocusedItemIndex(event, this.findFirstItemIndex());
          event.preventDefault();
        },
        onEndKey: function onEndKey(event) {
          this.changeFocusedItemIndex(event, this.findLastItemIndex());
          event.preventDefault();
        },
        onEnterKey: function onEnterKey(event) {
          if (this.focusedItemInfo.index !== -1) {
            var element = utils.DomHandler.findSingle(this.menubar, "li[id=\"".concat("".concat(this.focusedItemId), "\"]"));
            var anchorElement = element && utils.DomHandler.findSingle(element, 'a[data-pc-section="action"]');
            anchorElement ? anchorElement.click() : element && element.click();
            var processedItem = this.visibleItems[this.focusedItemInfo.index];
            var grouped = this.isProccessedItemGroup(processedItem);
            !grouped && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());
          }
          event.preventDefault();
        },
        onSpaceKey: function onSpaceKey(event) {
          this.onEnterKey(event);
        },
        onEscapeKey: function onEscapeKey(event) {
          if (this.focusedItemInfo.level !== 0) {
            var _focusedItemInfo = this.focusedItemInfo;
            this.hide(event, false);
            this.focusedItemInfo = {
              index: Number(_focusedItemInfo.parentKey.split('_')[0]),
              level: 0,
              parentKey: ''
            };
          }
          event.preventDefault();
        },
        onTabKey: function onTabKey(event) {
          if (this.focusedItemInfo.index !== -1) {
            var processedItem = this.visibleItems[this.focusedItemInfo.index];
            var grouped = this.isProccessedItemGroup(processedItem);
            !grouped && this.onItemChange({
              originalEvent: event,
              processedItem: processedItem
            });
          }
          this.hide();
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this5 = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              var isOutsideContainer = _this5.container && !_this5.container.contains(event.target);
              var isOutsideTarget = !(_this5.target && (_this5.target === event.target || _this5.target.contains(event.target)));
              if (isOutsideContainer && isOutsideTarget) {
                _this5.hide();
              }
            };
            document.addEventListener('click', this.outsideClickListener);
          }
        },
        unbindOutsideClickListener: function unbindOutsideClickListener() {
          if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
          }
        },
        bindResizeListener: function bindResizeListener() {
          var _this6 = this;
          if (!this.resizeListener) {
            this.resizeListener = function (event) {
              if (!utils.DomHandler.isTouchDevice()) {
                _this6.hide(event, true);
              }
              _this6.mobileActive = false;
            };
            window.addEventListener('resize', this.resizeListener);
          }
        },
        unbindResizeListener: function unbindResizeListener() {
          if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
          }
        },
        bindMatchMediaListener: function bindMatchMediaListener() {
          var _this7 = this;
          if (!this.matchMediaListener) {
            var query = matchMedia("(max-width: ".concat(this.breakpoint, ")"));
            this.query = query;
            this.queryMatches = query.matches;
            this.matchMediaListener = function () {
              _this7.queryMatches = query.matches;
              _this7.mobileActive = false;
            };
            this.query.addEventListener('change', this.matchMediaListener);
          }
        },
        unbindMatchMediaListener: function unbindMatchMediaListener() {
          if (this.matchMediaListener) {
            this.query.removeEventListener('change', this.matchMediaListener);
            this.matchMediaListener = null;
          }
        },
        isItemMatched: function isItemMatched(processedItem) {
          var _this$getProccessedIt;
          return this.isValidItem(processedItem) && ((_this$getProccessedIt = this.getProccessedItemLabel(processedItem)) === null || _this$getProccessedIt === void 0 ? void 0 : _this$getProccessedIt.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()));
        },
        isValidItem: function isValidItem(processedItem) {
          return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
        },
        isValidSelectedItem: function isValidSelectedItem(processedItem) {
          return this.isValidItem(processedItem) && this.isSelected(processedItem);
        },
        isSelected: function isSelected(processedItem) {
          return this.activeItemPath.some(function (p) {
            return p.key === processedItem.key;
          });
        },
        findFirstItemIndex: function findFirstItemIndex() {
          var _this8 = this;
          return this.visibleItems.findIndex(function (processedItem) {
            return _this8.isValidItem(processedItem);
          });
        },
        findLastItemIndex: function findLastItemIndex() {
          var _this9 = this;
          return utils.ObjectUtils.findLastIndex(this.visibleItems, function (processedItem) {
            return _this9.isValidItem(processedItem);
          });
        },
        findNextItemIndex: function findNextItemIndex(index) {
          var _this10 = this;
          var matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex(function (processedItem) {
            return _this10.isValidItem(processedItem);
          }) : -1;
          return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
        },
        findPrevItemIndex: function findPrevItemIndex(index) {
          var _this11 = this;
          var matchedItemIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), function (processedItem) {
            return _this11.isValidItem(processedItem);
          }) : -1;
          return matchedItemIndex > -1 ? matchedItemIndex : index;
        },
        findSelectedItemIndex: function findSelectedItemIndex() {
          var _this12 = this;
          return this.visibleItems.findIndex(function (processedItem) {
            return _this12.isValidSelectedItem(processedItem);
          });
        },
        findFirstFocusedItemIndex: function findFirstFocusedItemIndex() {
          var selectedIndex = this.findSelectedItemIndex();
          return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
        },
        findLastFocusedItemIndex: function findLastFocusedItemIndex() {
          var selectedIndex = this.findSelectedItemIndex();
          return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
        },
        searchItems: function searchItems(event, _char) {
          var _this13 = this;
          this.searchValue = (this.searchValue || '') + _char;
          var itemIndex = -1;
          var matched = false;
          if (this.focusedItemInfo.index !== -1) {
            itemIndex = this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function (processedItem) {
              return _this13.isItemMatched(processedItem);
            });
            itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo.index).findIndex(function (processedItem) {
              return _this13.isItemMatched(processedItem);
            }) : itemIndex + this.focusedItemInfo.index;
          } else {
            itemIndex = this.visibleItems.findIndex(function (processedItem) {
              return _this13.isItemMatched(processedItem);
            });
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
          this.searchTimeout = setTimeout(function () {
            _this13.searchValue = '';
            _this13.searchTimeout = null;
          }, 500);
          return matched;
        },
        changeFocusedItemIndex: function changeFocusedItemIndex(event, index) {
          if (this.focusedItemInfo.index !== index) {
            this.focusedItemInfo.index = index;
            this.scrollInView();
          }
        },
        scrollInView: function scrollInView() {
          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
          var id = index !== -1 ? "".concat(this.id, "_").concat(index) : this.focusedItemId;
          var element = utils.DomHandler.findSingle(this.menubar, "li[id=\"".concat(id, "\"]"));
          if (element) {
            element.scrollIntoView && element.scrollIntoView({
              block: 'nearest',
              inline: 'start'
            });
          }
        },
        createProcessedItems: function createProcessedItems(items) {
          var _this14 = this;
          var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
          var processedItems = [];
          items && items.forEach(function (item, index) {
            var key = (parentKey !== '' ? parentKey + '_' : '') + index;
            var newItem = {
              item: item,
              index: index,
              level: level,
              key: key,
              parent: parent,
              parentKey: parentKey
            };
            newItem['items'] = _this14.createProcessedItems(item.items, level + 1, newItem, key);
            processedItems.push(newItem);
          });
          return processedItems;
        },
        containerRef: function containerRef(el) {
          this.container = el;
        },
        menubarRef: function menubarRef(el) {
          this.menubar = el ? el.$el : undefined;
        }
      },
      computed: {
        processedItems: function processedItems() {
          return this.createProcessedItems(this.model || []);
        },
        visibleItems: function visibleItems() {
          var _this15 = this;
          var processedItem = this.activeItemPath.find(function (p) {
            return p.key === _this15.focusedItemInfo.parentKey;
          });
          return processedItem ? processedItem.items : this.processedItems;
        },
        focusedItemId: function focusedItemId() {
          return this.focusedItemInfo.index !== -1 ? "".concat(this.id).concat(utils.ObjectUtils.isNotEmpty(this.focusedItemInfo.parentKey) ? '_' + this.focusedItemInfo.parentKey : '', "_").concat(this.focusedItemInfo.index) : null;
        }
      },
      components: {
        MenubarSub: script$1,
        BarsIcon: BarsIcon__default["default"]
      }
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var _hoisted_1 = ["aria-haspopup", "aria-expanded", "aria-controls", "aria-label"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_BarsIcon = vue.resolveComponent("BarsIcon");
      var _component_MenubarSub = vue.resolveComponent("MenubarSub");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: $options.containerRef,
        "class": _ctx.cx('root')
      }, _ctx.ptmi('root')), [_ctx.$slots.start ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('start')
      }, _ctx.ptm('start')), [vue.renderSlot(_ctx.$slots, "start")], 16)) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "menubutton", {
        id: $data.id,
        "class": vue.normalizeClass(_ctx.cx('button')),
        toggleCallback: function toggleCallback(event) {
          return $options.menuButtonClick(event);
        }
      }, function () {
        var _ctx$$primevue$config;
        return [_ctx.model && _ctx.model.length > 0 ? (vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
          key: 0,
          ref: "menubutton",
          role: "button",
          tabindex: "0",
          "class": _ctx.cx('button'),
          "aria-haspopup": _ctx.model.length && _ctx.model.length > 0 ? true : false,
          "aria-expanded": $data.mobileActive,
          "aria-controls": $data.id,
          "aria-label": (_ctx$$primevue$config = _ctx.$primevue.config.locale.aria) === null || _ctx$$primevue$config === void 0 ? void 0 : _ctx$$primevue$config.navigation,
          onClick: _cache[0] || (_cache[0] = function ($event) {
            return $options.menuButtonClick($event);
          }),
          onKeydown: _cache[1] || (_cache[1] = function ($event) {
            return $options.menuButtonKeydown($event);
          })
        }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.ptm('button'))), [vue.renderSlot(_ctx.$slots, "menubuttonicon", {}, function () {
          return [vue.createVNode(_component_BarsIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('menubuttonicon'))), null, 16)];
        })], 16, _hoisted_1)) : vue.createCommentVNode("", true)];
      }), vue.createVNode(_component_MenubarSub, {
        ref: $options.menubarRef,
        id: $data.id,
        role: "menubar",
        items: $options.processedItems,
        templates: _ctx.$slots,
        root: true,
        mobileActive: $data.mobileActive,
        tabindex: "0",
        "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
        menuId: $data.id,
        focusedItemId: $data.focused ? $options.focusedItemId : undefined,
        activeItemPath: $data.activeItemPath,
        level: 0,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        pt: _ctx.pt,
        unstyled: _ctx.unstyled,
        onFocus: $options.onFocus,
        onBlur: $options.onBlur,
        onKeydown: $options.onKeyDown,
        onItemClick: $options.onItemClick,
        onItemMouseenter: $options.onItemMouseEnter,
        onItemMousemove: $options.onItemMouseMove
      }, null, 8, ["id", "items", "templates", "mobileActive", "aria-activedescendant", "menuId", "focusedItemId", "activeItemPath", "aria-labelledby", "aria-label", "pt", "unstyled", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter", "onItemMousemove"]), _ctx.$slots.end ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('end')
      }, _ctx.ptm('end')), [vue.renderSlot(_ctx.$slots, "end")], 16)) : vue.createCommentVNode("", true)], 16);
    }

    script.render = render;

    return script;

})(primevue.icons.bars, primevue.utils, primevue.basecomponent, primevue.menubar.style, primevue.icons.angledown, primevue.icons.angleright, primevue.ripple, Vue);
