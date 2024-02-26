import BarsIcon from 'primevue/icons/bars';
import { ObjectUtils, UniqueComponentId, ZIndexUtils, DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import MegaMenuStyle from 'primevue/megamenu/style';
import AngleDownIcon from 'primevue/icons/angledown';
import AngleRightIcon from 'primevue/icons/angleright';
import Ripple from 'primevue/ripple';
import { mergeProps, resolveComponent, resolveDirective, openBlock, createElementBlock, toDisplayString, createCommentVNode, Fragment, renderList, createElementVNode, withDirectives, createBlock, resolveDynamicComponent, normalizeClass, normalizeStyle, renderSlot, createVNode, normalizeProps, guardReactiveProps } from 'vue';

var script$2 = {
  name: 'BaseMegaMenu',
  "extends": BaseComponent,
  props: {
    model: {
      type: Array,
      "default": null
    },
    orientation: {
      type: String,
      "default": 'horizontal'
    },
    breakpoint: {
      type: String,
      "default": '960px'
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
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
  style: MegaMenuStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$1 = {
  name: 'MegaMenuSub',
  hostName: 'MegaMenu',
  "extends": BaseComponent,
  emits: ['item-click', 'item-mouseenter'],
  props: {
    menuId: {
      type: String,
      "default": null
    },
    focusedItemId: {
      type: String,
      "default": null
    },
    horizontal: {
      type: Boolean,
      "default": false
    },
    submenu: {
      type: Object,
      "default": null
    },
    mobileActive: {
      type: Boolean,
      "default": false
    },
    items: {
      type: Array,
      "default": null
    },
    level: {
      type: Number,
      "default": 0
    },
    templates: {
      type: Object,
      "default": null
    },
    activeItem: {
      type: Object,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": 0
    }
  },
  methods: {
    getSubListId: function getSubListId(processedItem) {
      return "".concat(this.getItemId(processedItem), "_list");
    },
    getSubListKey: function getSubListKey(processedItem) {
      return this.getSubListId(processedItem);
    },
    getItemId: function getItemId(processedItem) {
      return "".concat(this.menuId, "_").concat(processedItem.key);
    },
    getItemKey: function getItemKey(processedItem) {
      return this.getItemId(processedItem);
    },
    getItemProp: function getItemProp(processedItem, name, params) {
      return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    },
    getItemLabel: function getItemLabel(processedItem) {
      return this.getItemProp(processedItem, 'label');
    },
    getPTOptions: function getPTOptions(processedItem, index, key) {
      return this.ptm(key, {
        context: {
          item: processedItem,
          index: index,
          active: this.isItemActive(processedItem),
          focused: this.isItemFocused(processedItem),
          disabled: this.isItemDisabled(processedItem)
        }
      });
    },
    isItemActive: function isItemActive(processedItem) {
      return ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
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
      return ObjectUtils.isNotEmpty(processedItem.items);
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
        action: mergeProps({
          "class": this.cx('action'),
          tabindex: -1,
          'aria-hidden': true
        }, this.getPTOptions(processedItem, index, 'action')),
        icon: mergeProps({
          "class": [this.cx('icon'), this.getItemProp(processedItem, 'icon')]
        }, this.getPTOptions(processedItem, index, 'icon')),
        label: mergeProps({
          "class": this.cx('label')
        }, this.getPTOptions(processedItem, index, 'label')),
        submenuicon: mergeProps({
          "class": this.cx('submenuIcon')
        }, this.getPTOptions(processedItem, index, 'submenuIcon'))
      };
    }
  },
  components: {
    AngleRightIcon: AngleRightIcon,
    AngleDownIcon: AngleDownIcon
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1$1 = ["tabindex"];
var _hoisted_2$1 = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-level", "aria-setsize", "aria-posinset", "data-p-highlight", "data-p-focused", "data-p-disabled"];
var _hoisted_3 = ["onClick", "onMouseenter"];
var _hoisted_4 = ["href", "target"];
var _hoisted_5 = ["id"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_MegaMenuSub = resolveComponent("MegaMenuSub", true);
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("ul", mergeProps({
    "class": $props.level === 0 ? _ctx.cx('menu') : _ctx.cx('submenu'),
    tabindex: $props.tabindex
  }, $props.level === 0 ? _ctx.ptm('menu') : _ctx.ptm('submenu')), [$props.submenu ? (openBlock(), createElementBlock("li", mergeProps({
    key: 0,
    "class": [_ctx.cx('submenuHeader', {
      submenu: $props.submenu
    }), $options.getItemProp($props.submenu, 'class')],
    style: $options.getItemProp($props.submenu, 'style'),
    role: "presentation"
  }, _ctx.ptm('submenuHeader')), toDisplayString($options.getItemLabel($props.submenu)), 17)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, function (processedItem, index) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.getItemKey(processedItem)
    }, [$options.isItemVisible(processedItem) && !$options.getItemProp(processedItem, 'separator') ? (openBlock(), createElementBlock("li", mergeProps({
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
    }), [createElementVNode("div", mergeProps({
      "class": _ctx.cx('content'),
      onClick: function onClick($event) {
        return $options.onItemClick($event, processedItem);
      },
      onMouseenter: function onMouseenter($event) {
        return $options.onItemMouseEnter($event, processedItem);
      }
    }, $options.getPTOptions(processedItem, index, 'content')), [!$props.templates.item ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
      key: 0,
      href: $options.getItemProp(processedItem, 'url'),
      "class": _ctx.cx('action'),
      target: $options.getItemProp(processedItem, 'target'),
      tabindex: "-1",
      "aria-hidden": "true"
    }, $options.getPTOptions(processedItem, index, 'action')), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
      key: 0,
      item: processedItem.item,
      "class": normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["item", "class"])) : $options.getItemProp(processedItem, 'icon') ? (openBlock(), createElementBlock("span", mergeProps({
      key: 1,
      "class": [_ctx.cx('icon'), $options.getItemProp(processedItem, 'icon')]
    }, $options.getPTOptions(processedItem, index, 'icon')), null, 16)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
      "class": $props.level === 0 ? _ctx.cx('label') : _ctx.cx('submenuLabel')
    }, $props.level === 0 ? $options.getPTOptions(processedItem, index, 'label') : $options.getPTOptions(processedItem, index, 'submenuLabel')), toDisplayString($options.getItemLabel(processedItem)), 17), $options.isItemGroup(processedItem) ? (openBlock(), createElementBlock(Fragment, {
      key: 2
    }, [$props.templates.submenuicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.submenuicon), mergeProps({
      key: 0,
      active: $options.isItemActive(processedItem),
      "class": _ctx.cx('submenuIcon')
    }, $options.getPTOptions(processedItem, index, 'submenuIcon')), null, 16, ["active", "class"])) : (openBlock(), createBlock(resolveDynamicComponent($props.horizontal || $props.mobileActive ? 'AngleDownIcon' : 'AngleRightIcon'), mergeProps({
      key: 1,
      "class": _ctx.cx('submenuIcon')
    }, $options.getPTOptions(processedItem, index, 'submenuIcon')), null, 16, ["class"]))], 64)) : createCommentVNode("", true)], 16, _hoisted_4)), [[_directive_ripple]]) : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
      key: 1,
      item: processedItem.item,
      hasSubmenu: $options.isItemGroup(processedItem),
      label: $options.getItemLabel(processedItem),
      props: $options.getMenuItemProps(processedItem, index)
    }, null, 8, ["item", "hasSubmenu", "label", "props"]))], 16, _hoisted_3), $options.isItemVisible(processedItem) && $options.isItemGroup(processedItem) ? (openBlock(), createElementBlock("div", mergeProps({
      key: 0,
      "class": _ctx.cx('panel')
    }, _ctx.ptm('panel')), [createElementVNode("div", mergeProps({
      "class": _ctx.cx('grid')
    }, _ctx.ptm('grid')), [(openBlock(true), createElementBlock(Fragment, null, renderList(processedItem.items, function (col) {
      return openBlock(), createElementBlock("div", mergeProps({
        key: $options.getItemKey(col),
        "class": _ctx.cx('column', {
          processedItem: processedItem
        })
      }, _ctx.ptm('column')), [(openBlock(true), createElementBlock(Fragment, null, renderList(col, function (submenu) {
        return openBlock(), createBlock(_component_MegaMenuSub, {
          key: $options.getSubListKey(submenu),
          id: $options.getSubListId(submenu),
          style: normalizeStyle(_ctx.sx('submenu', true, {
            processedItem: processedItem
          })),
          role: "menu",
          menuId: $props.menuId,
          focusedItemId: $props.focusedItemId,
          submenu: submenu,
          items: submenu.items,
          templates: $props.templates,
          level: $props.level + 1,
          mobileActive: $props.mobileActive,
          pt: _ctx.pt,
          unstyled: _ctx.unstyled,
          onItemClick: _cache[0] || (_cache[0] = function ($event) {
            return _ctx.$emit('item-click', $event);
          }),
          onItemMouseenter: _cache[1] || (_cache[1] = function ($event) {
            return _ctx.$emit('item-mouseenter', $event);
          })
        }, null, 8, ["id", "style", "menuId", "focusedItemId", "submenu", "items", "templates", "level", "mobileActive", "pt", "unstyled"]);
      }), 128))], 16);
    }), 128))], 16)], 16)) : createCommentVNode("", true)], 16, _hoisted_2$1)) : createCommentVNode("", true), $options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator') ? (openBlock(), createElementBlock("li", mergeProps({
      key: 1,
      id: $options.getItemId(processedItem),
      "class": [_ctx.cx('separator'), $options.getItemProp(processedItem, 'class')],
      style: $options.getItemProp(processedItem, 'style'),
      role: "separator"
    }, _ctx.ptm('separator')), null, 16, _hoisted_5)) : createCommentVNode("", true)], 64);
  }), 128))], 16, _hoisted_1$1);
}

script$1.render = render$1;

var script = {
  name: 'MegaMenu',
  "extends": script$2,
  inheritAttrs: false,
  emits: ['focus', 'blur'],
  outsideClickListener: null,
  resizeListener: null,
  matchMediaListener: null,
  container: null,
  menubar: null,
  searchTimeout: null,
  searchValue: null,
  data: function data() {
    return {
      id: this.$attrs.id,
      mobileActive: false,
      focused: false,
      focusedItemInfo: {
        index: -1,
        key: '',
        parentKey: ''
      },
      activeItem: null,
      dirty: false,
      query: null,
      queryMatches: false
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    activeItem: function activeItem(newItem) {
      if (ObjectUtils.isNotEmpty(newItem)) {
        this.bindOutsideClickListener();
        this.bindResizeListener();
      } else {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
      }
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    this.bindMatchMediaListener();
  },
  beforeUnmount: function beforeUnmount() {
    this.mobileActive = false;
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    this.unbindMatchMediaListener();
  },
  methods: {
    getItemProp: function getItemProp(item, name) {
      return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    },
    getItemLabel: function getItemLabel(item) {
      return this.getItemProp(item, 'label');
    },
    isItemDisabled: function isItemDisabled(item) {
      return this.getItemProp(item, 'disabled');
    },
    isItemGroup: function isItemGroup(item) {
      return ObjectUtils.isNotEmpty(this.getItemProp(item, 'items'));
    },
    isItemSeparator: function isItemSeparator(item) {
      return this.getItemProp(item, 'separator');
    },
    getProccessedItemLabel: function getProccessedItemLabel(processedItem) {
      return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    },
    isProccessedItemGroup: function isProccessedItemGroup(processedItem) {
      return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    },
    toggle: function toggle(event) {
      var _this = this;
      if (this.mobileActive) {
        this.mobileActive = false;
        ZIndexUtils.clear(this.menubar);
        this.hide();
      } else {
        this.mobileActive = true;
        ZIndexUtils.set('menu', this.menubar, this.$primevue.config.zIndex.menu);
        setTimeout(function () {
          _this.show();
        }, 1);
      }
      this.bindOutsideClickListener();
      event.preventDefault();
    },
    show: function show() {
      this.focusedItemInfo = {
        index: this.findFirstFocusedItemIndex(),
        level: 0,
        parentKey: ''
      };
      DomHandler.focus(this.menubar);
    },
    hide: function hide(event, isFocus) {
      var _this2 = this;
      if (this.mobileActive) {
        this.mobileActive = false;
        setTimeout(function () {
          DomHandler.focus(_this2.$refs.menubutton);
        }, 0);
      }
      this.activeItem = null;
      this.focusedItemInfo = {
        index: -1,
        key: '',
        parentKey: ''
      };
      isFocus && DomHandler.focus(this.menubar);
      this.dirty = false;
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      if (this.focusedItemInfo.index === -1) {
        var index = this.findFirstFocusedItemIndex();
        var processedItem = this.findVisibleItem(index);
        this.focusedItemInfo = {
          index: index,
          key: processedItem.key,
          parentKey: processedItem.parentKey
        };
      }
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.focusedItemInfo = {
        index: -1,
        key: '',
        parentKey: ''
      };
      this.searchValue = '';
      this.dirty = false;
      this.$emit('blur', event);
    },
    onKeyDown: function onKeyDown(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
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
          if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
            this.searchItems(event, event.key);
          }
          break;
      }
    },
    onItemChange: function onItemChange(event) {
      var processedItem = event.processedItem,
        isFocus = event.isFocus;
      if (ObjectUtils.isEmpty(processedItem)) return;
      var index = processedItem.index,
        key = processedItem.key,
        parentKey = processedItem.parentKey,
        items = processedItem.items;
      var grouped = ObjectUtils.isNotEmpty(items);
      grouped && (this.activeItem = processedItem);
      this.focusedItemInfo = {
        index: index,
        key: key,
        parentKey: parentKey
      };
      grouped && (this.dirty = true);
      isFocus && DomHandler.focus(this.menubar);
    },
    onItemClick: function onItemClick(event) {
      var originalEvent = event.originalEvent,
        processedItem = event.processedItem;
      var grouped = this.isProccessedItemGroup(processedItem);
      var root = ObjectUtils.isEmpty(processedItem.parent);
      var selected = this.isSelected(processedItem);
      if (selected) {
        var index = processedItem.index,
          key = processedItem.key,
          parentKey = processedItem.parentKey;
        this.activeItem = null;
        this.focusedItemInfo = {
          index: index,
          key: key,
          parentKey: parentKey
        };
        this.dirty = !root;
        DomHandler.focus(this.menubar);
      } else {
        if (grouped) {
          this.onItemChange(event);
        } else {
          var rootProcessedItem = root ? processedItem : this.activeItem;
          this.hide(originalEvent);
          this.changeFocusedItemInfo(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);
          this.mobileActive = false;
          DomHandler.focus(this.menubar);
        }
      }
    },
    onItemMouseEnter: function onItemMouseEnter(event) {
      if (!this.mobileActive && this.dirty) {
        this.onItemChange(event);
      }
    },
    menuButtonClick: function menuButtonClick(event) {
      this.toggle(event);
    },
    menuButtonKeydown: function menuButtonKeydown(event) {
      (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') && this.menuButtonClick(event);
    },
    onArrowDownKey: function onArrowDownKey(event) {
      if (this.horizontal) {
        if (ObjectUtils.isNotEmpty(this.activeItem) && this.activeItem.key === this.focusedItemInfo.key) {
          this.focusedItemInfo = {
            index: -1,
            key: '',
            parentKey: this.activeItem.key
          };
        } else {
          var processedItem = this.findVisibleItem(this.focusedItemInfo.index);
          var grouped = this.isProccessedItemGroup(processedItem);
          if (grouped) {
            this.onItemChange({
              originalEvent: event,
              processedItem: processedItem
            });
            this.focusedItemInfo = {
              index: -1,
              key: processedItem.key,
              parentKey: processedItem.parentKey
            };
            this.searchValue = '';
          }
        }
      }
      var itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();
      this.changeFocusedItemInfo(event, itemIndex);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      if (event.altKey && this.horizontal) {
        if (this.focusedItemInfo.index !== -1) {
          var processedItem = this.findVisibleItem(this.focusedItemInfo.index);
          var grouped = this.isProccessedItemGroup(processedItem);
          if (!grouped && ObjectUtils.isNotEmpty(this.activeItem)) {
            if (this.focusedItemInfo.index === 0) {
              this.focusedItemInfo = {
                index: this.activeItem.index,
                key: this.activeItem.key,
                parentKey: this.activeItem.parentKey
              };
              this.activeItem = null;
            } else {
              this.changeFocusedItemInfo(event, this.findFirstItemIndex());
            }
          }
        }
        event.preventDefault();
      } else {
        var itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();
        this.changeFocusedItemInfo(event, itemIndex);
        event.preventDefault();
      }
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var processedItem = this.findVisibleItem(this.focusedItemInfo.index);
      var grouped = this.isProccessedItemGroup(processedItem);
      if (grouped) {
        if (this.horizontal) {
          var itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();
          this.changeFocusedItemInfo(event, itemIndex);
        }
      } else {
        if (this.vertical && ObjectUtils.isNotEmpty(this.activeItem)) {
          if (processedItem.columnIndex === 0) {
            this.focusedItemInfo = {
              index: this.activeItem.index,
              key: this.activeItem.key,
              parentKey: this.activeItem.parentKey
            };
            this.activeItem = null;
          }
        }
        var columnIndex = processedItem.columnIndex - 1;
        var _itemIndex = this.visibleItems.findIndex(function (item) {
          return item.columnIndex === columnIndex;
        });
        _itemIndex !== -1 && this.changeFocusedItemInfo(event, _itemIndex);
      }
      event.preventDefault();
    },
    onArrowRightKey: function onArrowRightKey(event) {
      var processedItem = this.findVisibleItem(this.focusedItemInfo.index);
      var grouped = this.isProccessedItemGroup(processedItem);
      if (grouped) {
        if (this.vertical) {
          if (ObjectUtils.isNotEmpty(this.activeItem) && this.activeItem.key === processedItem.key) {
            this.focusedItemInfo = {
              index: -1,
              key: '',
              parentKey: this.activeItem.key
            };
          } else {
            var _processedItem = this.findVisibleItem(this.focusedItemInfo.index);
            var _grouped = this.isProccessedItemGroup(_processedItem);
            if (_grouped) {
              this.onItemChange({
                originalEvent: event,
                processedItem: _processedItem
              });
              this.focusedItemInfo = {
                index: -1,
                key: _processedItem.key,
                parentKey: _processedItem.parentKey
              };
              this.searchValue = '';
            }
          }
        }
        var itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemInfo(event, itemIndex);
      } else {
        var columnIndex = processedItem.columnIndex + 1;
        var _itemIndex2 = this.visibleItems.findIndex(function (item) {
          return item.columnIndex === columnIndex;
        });
        _itemIndex2 !== -1 && this.changeFocusedItemInfo(event, _itemIndex2);
      }
      event.preventDefault();
    },
    onHomeKey: function onHomeKey(event) {
      this.changeFocusedItemInfo(event, this.findFirstItemIndex());
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      this.changeFocusedItemInfo(event, this.findLastItemIndex());
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      if (this.focusedItemInfo.index !== -1) {
        var element = DomHandler.findSingle(this.menubar, "li[id=\"".concat("".concat(this.focusedItemId), "\"]"));
        var anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
        anchorElement ? anchorElement.click() : element && element.click();
        var processedItem = this.visibleItems[this.focusedItemInfo.index];
        var grouped = this.isProccessedItemGroup(processedItem);
        !grouped && this.changeFocusedItemInfo(event, this.findFirstFocusedItemIndex());
      }
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event) {
      this.onEnterKey(event);
    },
    onEscapeKey: function onEscapeKey(event) {
      if (ObjectUtils.isNotEmpty(this.activeItem)) {
        this.focusedItemInfo = {
          index: this.activeItem.index,
          key: this.activeItem.key
        };
        this.activeItem = null;
      }
      event.preventDefault();
    },
    onTabKey: function onTabKey(event) {
      if (this.focusedItemInfo.index !== -1) {
        var processedItem = this.findVisibleItem(this.focusedItemInfo.index);
        var grouped = this.isProccessedItemGroup(processedItem);
        !grouped && this.onItemChange({
          originalEvent: event,
          processedItem: processedItem
        });
      }
      this.hide();
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this3 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          var isOutsideContainer = _this3.container && !_this3.container.contains(event.target);
          var isOutsideTarget = !(_this3.target && (_this3.target === event.target || _this3.target.contains(event.target)));
          if (isOutsideContainer && isOutsideTarget) {
            _this3.hide();
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
      var _this4 = this;
      if (!this.resizeListener) {
        this.resizeListener = function (event) {
          if (!DomHandler.isTouchDevice()) {
            _this4.hide(event, true);
          }
          _this4.mobileActive = false;
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
      var _this5 = this;
      if (!this.matchMediaListener) {
        var query = matchMedia("(max-width: ".concat(this.breakpoint, ")"));
        this.query = query;
        this.queryMatches = query.matches;
        this.matchMediaListener = function () {
          _this5.queryMatches = query.matches;
          _this5.mobileActive = false;
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
      return ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
    },
    findFirstItemIndex: function findFirstItemIndex() {
      var _this6 = this;
      return this.visibleItems.findIndex(function (processedItem) {
        return _this6.isValidItem(processedItem);
      });
    },
    findLastItemIndex: function findLastItemIndex() {
      var _this7 = this;
      return ObjectUtils.findLastIndex(this.visibleItems, function (processedItem) {
        return _this7.isValidItem(processedItem);
      });
    },
    findNextItemIndex: function findNextItemIndex(index) {
      var _this8 = this;
      var matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex(function (processedItem) {
        return _this8.isValidItem(processedItem);
      }) : -1;
      return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    },
    findPrevItemIndex: function findPrevItemIndex(index) {
      var _this9 = this;
      var matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), function (processedItem) {
        return _this9.isValidItem(processedItem);
      }) : -1;
      return matchedItemIndex > -1 ? matchedItemIndex : index;
    },
    findSelectedItemIndex: function findSelectedItemIndex() {
      var _this10 = this;
      return this.visibleItems.findIndex(function (processedItem) {
        return _this10.isValidSelectedItem(processedItem);
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
    findVisibleItem: function findVisibleItem(index) {
      return ObjectUtils.isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
    },
    searchItems: function searchItems(event, _char) {
      var _this11 = this;
      this.searchValue = (this.searchValue || '') + _char;
      var itemIndex = -1;
      var matched = false;
      if (this.focusedItemInfo.index !== -1) {
        itemIndex = this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function (processedItem) {
          return _this11.isItemMatched(processedItem);
        });
        itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo.index).findIndex(function (processedItem) {
          return _this11.isItemMatched(processedItem);
        }) : itemIndex + this.focusedItemInfo.index;
      } else {
        itemIndex = this.visibleItems.findIndex(function (processedItem) {
          return _this11.isItemMatched(processedItem);
        });
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
      this.searchTimeout = setTimeout(function () {
        _this11.searchValue = '';
        _this11.searchTimeout = null;
      }, 500);
      return matched;
    },
    changeFocusedItemInfo: function changeFocusedItemInfo(event, index) {
      var processedItem = this.findVisibleItem(index);
      this.focusedItemInfo.index = index;
      this.focusedItemInfo.key = ObjectUtils.isNotEmpty(processedItem) ? processedItem.key : '';
      this.scrollInView();
    },
    scrollInView: function scrollInView() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var id = index !== -1 ? "".concat(this.id, "_").concat(index) : this.focusedItemId;
      var element = DomHandler.findSingle(this.menubar, "li[id=\"".concat(id, "\"]"));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      }
    },
    createProcessedItems: function createProcessedItems(items) {
      var _this12 = this;
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var columnIndex = arguments.length > 4 ? arguments[4] : undefined;
      var processedItems = [];
      items && items.forEach(function (item, index) {
        var key = (parentKey !== '' ? parentKey + '_' : '') + (columnIndex !== undefined ? columnIndex + '_' : '') + index;
        var newItem = {
          item: item,
          index: index,
          level: level,
          key: key,
          parent: parent,
          parentKey: parentKey,
          columnIndex: columnIndex !== undefined ? columnIndex : parent.columnIndex !== undefined ? parent.columnIndex : index
        };
        newItem['items'] = level === 0 && item.items && item.items.length > 0 ? item.items.map(function (_items, _index) {
          return _this12.createProcessedItems(_items, level + 1, newItem, key, _index);
        }) : _this12.createProcessedItems(item.items, level + 1, newItem, key);
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
      var processedItem = ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem : null;
      return processedItem && processedItem.key === this.focusedItemInfo.parentKey ? processedItem.items.reduce(function (items, col) {
        col.forEach(function (submenu) {
          submenu.items.forEach(function (a) {
            items.push(a);
          });
        });
        return items;
      }, []) : this.processedItems;
    },
    horizontal: function horizontal() {
      return this.orientation === 'horizontal';
    },
    vertical: function vertical() {
      return this.orientation === 'vertical';
    },
    focusedItemId: function focusedItemId() {
      return ObjectUtils.isNotEmpty(this.focusedItemInfo.key) ? "".concat(this.id, "_").concat(this.focusedItemInfo.key) : null;
    }
  },
  components: {
    MegaMenuSub: script$1,
    BarsIcon: BarsIcon
  }
};

var _hoisted_1 = ["id"];
var _hoisted_2 = ["aria-haspopup", "aria-expanded", "aria-controls", "aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_BarsIcon = resolveComponent("BarsIcon");
  var _component_MegaMenuSub = resolveComponent("MegaMenuSub");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: $options.containerRef,
    id: $data.id,
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [_ctx.$slots.start ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('start')
  }, _ctx.ptm('start')), [renderSlot(_ctx.$slots, "start")], 16)) : createCommentVNode("", true), renderSlot(_ctx.$slots, "menubutton", {
    id: $data.id,
    "class": normalizeClass(_ctx.cx('menubutton')),
    toggleCallback: function toggleCallback(event) {
      return $options.menuButtonClick(event);
    }
  }, function () {
    var _ctx$$primevue$config;
    return [_ctx.model && _ctx.model.length > 0 ? (openBlock(), createElementBlock("a", mergeProps({
      key: 0,
      ref: "menubutton",
      role: "button",
      tabindex: "0",
      "class": _ctx.cx('menubutton'),
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
    }, _ctx.ptm('menubutton')), [renderSlot(_ctx.$slots, "menubuttonicon", {}, function () {
      return [createVNode(_component_BarsIcon, normalizeProps(guardReactiveProps(_ctx.ptm('menubuttonicon'))), null, 16)];
    })], 16, _hoisted_2)) : createCommentVNode("", true)];
  }), createVNode(_component_MegaMenuSub, {
    ref: $options.menubarRef,
    id: $data.id + '_list',
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    role: "menubar",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-disabled": _ctx.disabled || undefined,
    "aria-orientation": _ctx.orientation,
    "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
    menuId: $data.id,
    focusedItemId: $data.focused ? $options.focusedItemId : undefined,
    items: $options.processedItems,
    horizontal: $options.horizontal,
    templates: _ctx.$slots,
    activeItem: $data.activeItem,
    mobileActive: $data.mobileActive,
    level: 0,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeydown: $options.onKeyDown,
    onItemClick: $options.onItemClick,
    onItemMouseenter: $options.onItemMouseEnter
  }, null, 8, ["id", "tabindex", "aria-label", "aria-labelledby", "aria-disabled", "aria-orientation", "aria-activedescendant", "menuId", "focusedItemId", "items", "horizontal", "templates", "activeItem", "mobileActive", "pt", "unstyled", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter"]), _ctx.$slots.end ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx('end')
  }, _ctx.ptm('end')), [renderSlot(_ctx.$slots, "end")], 16)) : createCommentVNode("", true)], 16, _hoisted_1);
}

script.render = render;

export { script as default };
