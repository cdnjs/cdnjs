'use strict';

var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var TieredMenuStyle = require('primevue/tieredmenu/style');
var AngleRightIcon = require('primevue/icons/angleright');
var Ripple = require('primevue/ripple');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TieredMenuStyle__default = /*#__PURE__*/_interopDefaultLegacy(TieredMenuStyle);
var AngleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleRightIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script$2 = {
  name: 'BaseTieredMenu',
  "extends": BaseComponent__default["default"],
  props: {
    popup: {
      type: Boolean,
      "default": false
    },
    model: {
      type: Array,
      "default": null
    },
    appendTo: {
      type: [String, Object],
      "default": 'body'
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    baseZIndex: {
      type: Number,
      "default": 0
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
  style: TieredMenuStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$1 = {
  name: 'TieredMenuSub',
  hostName: 'TieredMenu',
  "extends": BaseComponent__default["default"],
  emits: ['item-click', 'item-mouseenter', 'item-mousemove'],
  container: null,
  props: {
    menuId: {
      type: String,
      "default": null
    },
    focusedItemId: {
      type: String,
      "default": null
    },
    items: {
      type: Array,
      "default": null
    },
    visible: {
      type: Boolean,
      "default": false
    },
    level: {
      type: Number,
      "default": 0
    },
    templates: {
      type: Object,
      "default": null
    },
    activeItemPath: {
      type: Object,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": 0
    }
  },
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
          disabled: this.isItemDisabled(processedItem)
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
    onEnter: function onEnter() {
      utils.DomHandler.nestedPosition(this.container, this.level);
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
    },
    containerRef: function containerRef(el) {
      this.container = el;
    }
  },
  components: {
    AngleRightIcon: AngleRightIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

var _hoisted_1$1 = ["tabindex"];
var _hoisted_2 = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-level", "aria-setsize", "aria-posinset", "data-p-highlight", "data-p-focused", "data-p-disabled"];
var _hoisted_3 = ["onClick", "onMouseenter", "onMousemove"];
var _hoisted_4 = ["href", "target"];
var _hoisted_5 = ["id"];
var _hoisted_6 = ["id"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_AngleRightIcon = vue.resolveComponent("AngleRightIcon");
  var _component_TieredMenuSub = vue.resolveComponent("TieredMenuSub", true);
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createBlock(vue.Transition, vue.mergeProps({
    name: "p-tieredmenu",
    onEnter: $options.onEnter
  }, _ctx.ptm('menu.transition')), {
    "default": vue.withCtx(function () {
      return [($props.level === 0 ? true : $props.visible) ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
        key: 0,
        ref: $options.containerRef,
        "class": $props.level === 0 ? _ctx.cx('menu') : _ctx.cx('submenu'),
        tabindex: $props.tabindex
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
        }, $options.getPTOptions(processedItem, index, 'label')), vue.toDisplayString($options.getItemLabel(processedItem)), 17, _hoisted_5), $options.getItemProp(processedItem, 'items') ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 2
        }, [$props.templates.submenuicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.submenuicon), vue.mergeProps({
          key: 0,
          "class": _ctx.cx('submenuIcon'),
          active: $options.isItemActive(processedItem)
        }, $options.getPTOptions(processedItem, index, 'submenuIcon')), null, 16, ["class", "active"])) : (vue.openBlock(), vue.createBlock(_component_AngleRightIcon, vue.mergeProps({
          key: 1,
          "class": _ctx.cx('submenuIcon')
        }, $options.getPTOptions(processedItem, index, 'submenuIcon')), null, 16, ["class"]))], 64)) : vue.createCommentVNode("", true)], 16, _hoisted_4)), [[_directive_ripple]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
          key: 1,
          item: processedItem.item,
          hasSubmenu: $options.getItemProp(processedItem, 'items'),
          label: $options.getItemLabel(processedItem),
          props: $options.getMenuItemProps(processedItem, index)
        }, null, 8, ["item", "hasSubmenu", "label", "props"]))], 16, _hoisted_3), $options.isItemVisible(processedItem) && $options.isItemGroup(processedItem) ? (vue.openBlock(), vue.createBlock(_component_TieredMenuSub, {
          key: 0,
          id: $options.getItemId(processedItem) + '_list',
          style: vue.normalizeStyle(_ctx.sx('submenu', true, {
            processedItem: processedItem
          })),
          "aria-labelledby": $options.getItemLabelId(processedItem),
          role: "menu",
          menuId: $props.menuId,
          focusedItemId: $props.focusedItemId,
          items: processedItem.items,
          templates: $props.templates,
          activeItemPath: $props.activeItemPath,
          level: $props.level + 1,
          visible: $options.isItemActive(processedItem) && $options.isItemGroup(processedItem),
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
        }, null, 8, ["id", "style", "aria-labelledby", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "level", "visible", "pt", "unstyled"])) : vue.createCommentVNode("", true)], 16, _hoisted_2)) : vue.createCommentVNode("", true), $options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator') ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
          key: 1,
          id: $options.getItemId(processedItem),
          style: $options.getItemProp(processedItem, 'style'),
          "class": [_ctx.cx('separator'), $options.getItemProp(processedItem, 'class')],
          role: "separator"
        }, _ctx.ptm('separator')), null, 16, _hoisted_6)) : vue.createCommentVNode("", true)], 64);
      }), 128))], 16, _hoisted_1$1)) : vue.createCommentVNode("", true)];
    }),
    _: 1
  }, 16, ["onEnter"]);
}

script$1.render = render$1;

var script = {
  name: 'TieredMenu',
  "extends": script$2,
  inheritAttrs: false,
  emits: ['focus', 'blur', 'before-show', 'before-hide', 'hide', 'show'],
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  target: null,
  container: null,
  menubar: null,
  searchTimeout: null,
  searchValue: null,
  data: function data() {
    return {
      id: this.$attrs.id,
      focused: false,
      focusedItemInfo: {
        index: -1,
        level: 0,
        parentKey: ''
      },
      activeItemPath: [],
      visible: !this.popup,
      submenuVisible: false,
      dirty: false
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    activeItemPath: function activeItemPath(newPath) {
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
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
  },
  beforeUnmount: function beforeUnmount() {
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
    getItemProp: function getItemProp(item, name) {
      return item ? utils.ObjectUtils.getItemValue(item[name]) : undefined;
    },
    getItemLabel: function getItemLabel(item) {
      return this.getItemProp(item, 'label');
    },
    isItemDisabled: function isItemDisabled(item) {
      return this.getItemProp(item, 'disabled');
    },
    isItemVisible: function isItemVisible(item) {
      return this.getItemProp(item, 'visible') !== false;
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
      this.visible ? this.hide(event, true) : this.show(event);
    },
    show: function show(event, isFocus) {
      if (this.popup) {
        this.$emit('before-show');
        this.visible = true;
        this.target = this.target || event.currentTarget;
        this.relatedTarget = event.relatedTarget || null;
      }
      isFocus && utils.DomHandler.focus(this.menubar);
    },
    hide: function hide(event, isFocus) {
      if (this.popup) {
        this.$emit('before-hide');
        this.visible = false;
      }
      this.activeItemPath = [];
      this.focusedItemInfo = {
        index: -1,
        level: 0,
        parentKey: ''
      };
      isFocus && utils.DomHandler.focus(this.relatedTarget || this.target || this.menubar);
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
      if (grouped) {
        activeItemPath.push(processedItem);
        this.submenuVisible = true;
      }
      this.focusedItemInfo = {
        index: index,
        level: level,
        parentKey: parentKey
      };
      this.activeItemPath = activeItemPath;
      grouped && (this.dirty = true);
      isFocus && utils.DomHandler.focus(this.menubar);
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus__default["default"].emit('overlay-click', {
        originalEvent: event,
        target: this.target
      });
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
          utils.DomHandler.focus(this.menubar);
        }
      }
    },
    onItemMouseEnter: function onItemMouseEnter(event) {
      if (this.dirty) {
        this.onItemChange(event);
      }
    },
    onItemMouseMove: function onItemMouseMove(event) {
      if (this.focused) {
        this.changeFocusedItemIndex(event, event.processedItem.index);
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();
      this.changeFocusedItemIndex(event, itemIndex);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      if (event.altKey) {
        if (this.focusedItemInfo.index !== -1) {
          var processedItem = this.visibleItems[this.focusedItemInfo.index];
          var grouped = this.isProccessedItemGroup(processedItem);
          !grouped && this.onItemChange({
            originalEvent: event,
            processedItem: processedItem
          });
        }
        this.popup && this.hide(event, true);
        event.preventDefault();
      } else {
        var itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();
        this.changeFocusedItemIndex(event, itemIndex);
        event.preventDefault();
      }
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var _this = this;
      var processedItem = this.visibleItems[this.focusedItemInfo.index];
      var parentItem = this.activeItemPath.find(function (p) {
        return p.key === processedItem.parentKey;
      });
      var root = utils.ObjectUtils.isEmpty(processedItem.parent);
      if (!root) {
        this.focusedItemInfo = {
          index: -1,
          parentKey: parentItem ? parentItem.parentKey : ''
        };
        this.searchValue = '';
        this.onArrowDownKey(event);
      }
      this.activeItemPath = this.activeItemPath.filter(function (p) {
        return p.parentKey !== _this.focusedItemInfo.parentKey;
      });
      event.preventDefault();
    },
    onArrowRightKey: function onArrowRightKey(event) {
      var processedItem = this.visibleItems[this.focusedItemInfo.index];
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
        this.searchValue = '';
        this.onArrowDownKey(event);
      }
      event.preventDefault();
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
        var anchorElement = element && utils.DomHandler.findSingle(element, '[data-pc-section="action"]');
        anchorElement ? anchorElement.click() : element && element.click();
        if (!this.popup) {
          var processedItem = this.visibleItems[this.focusedItemInfo.index];
          var grouped = this.isProccessedItemGroup(processedItem);
          !grouped && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());
        }
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
        !this.popup && (this.focusedItemInfo = {
          index: Number(_focusedItemInfo.parentKey.split('_')[0]),
          level: 0,
          parentKey: ''
        });
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
    onEnter: function onEnter(el) {
      if (this.autoZIndex) {
        utils.ZIndexUtils.set('menu', el, this.baseZIndex + this.$primevue.config.zIndex.menu);
      }
      utils.DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      this.alignOverlay();
      utils.DomHandler.focus(this.menubar);
      this.scrollInView();
    },
    onAfterEnter: function onAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit('show');
    },
    onLeave: function onLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit('hide');
      this.container = null;
      this.dirty = false;
    },
    onAfterLeave: function onAfterLeave(el) {
      if (this.autoZIndex) {
        utils.ZIndexUtils.clear(el);
      }
    },
    alignOverlay: function alignOverlay() {
      utils.DomHandler.absolutePosition(this.container, this.target);
      var targetWidth = utils.DomHandler.getOuterWidth(this.target);
      if (targetWidth > utils.DomHandler.getOuterWidth(this.container)) {
        this.container.style.minWidth = utils.DomHandler.getOuterWidth(this.target) + 'px';
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this2 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          var isOutsideContainer = _this2.container && !_this2.container.contains(event.target);
          var isOutsideTarget = _this2.popup ? !(_this2.target && (_this2.target === event.target || _this2.target.contains(event.target))) : true;
          if (isOutsideContainer && isOutsideTarget) {
            _this2.hide();
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
    bindScrollListener: function bindScrollListener() {
      var _this3 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.target, function (event) {
          _this3.hide(event, true);
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this4 = this;
      if (!this.resizeListener) {
        this.resizeListener = function (event) {
          if (!utils.DomHandler.isTouchDevice()) {
            _this4.hide(event, true);
          }
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
    isItemMatched: function isItemMatched(processedItem) {
      var _this$getProccessedIt;
      return this.isValidItem(processedItem) && ((_this$getProccessedIt = this.getProccessedItemLabel(processedItem)) === null || _this$getProccessedIt === void 0 ? void 0 : _this$getProccessedIt.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()));
    },
    isValidItem: function isValidItem(processedItem) {
      return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item) && this.isItemVisible(processedItem.item);
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
      var _this5 = this;
      return this.visibleItems.findIndex(function (processedItem) {
        return _this5.isValidItem(processedItem);
      });
    },
    findLastItemIndex: function findLastItemIndex() {
      var _this6 = this;
      return utils.ObjectUtils.findLastIndex(this.visibleItems, function (processedItem) {
        return _this6.isValidItem(processedItem);
      });
    },
    findNextItemIndex: function findNextItemIndex(index) {
      var _this7 = this;
      var matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex(function (processedItem) {
        return _this7.isValidItem(processedItem);
      }) : -1;
      return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    },
    findPrevItemIndex: function findPrevItemIndex(index) {
      var _this8 = this;
      var matchedItemIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), function (processedItem) {
        return _this8.isValidItem(processedItem);
      }) : -1;
      return matchedItemIndex > -1 ? matchedItemIndex : index;
    },
    findSelectedItemIndex: function findSelectedItemIndex() {
      var _this9 = this;
      return this.visibleItems.findIndex(function (processedItem) {
        return _this9.isValidSelectedItem(processedItem);
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
      var _this10 = this;
      this.searchValue = (this.searchValue || '') + _char;
      var itemIndex = -1;
      var matched = false;
      if (this.focusedItemInfo.index !== -1) {
        itemIndex = this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function (processedItem) {
          return _this10.isItemMatched(processedItem);
        });
        itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo.index).findIndex(function (processedItem) {
          return _this10.isItemMatched(processedItem);
        }) : itemIndex + this.focusedItemInfo.index;
      } else {
        itemIndex = this.visibleItems.findIndex(function (processedItem) {
          return _this10.isItemMatched(processedItem);
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
        _this10.searchValue = '';
        _this10.searchTimeout = null;
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
      var _this11 = this;
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
        newItem['items'] = _this11.createProcessedItems(item.items, level + 1, newItem, key);
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
      var _this12 = this;
      var processedItem = this.activeItemPath.find(function (p) {
        return p.key === _this12.focusedItemInfo.parentKey;
      });
      return processedItem ? processedItem.items : this.processedItems;
    },
    focusedItemId: function focusedItemId() {
      return this.focusedItemInfo.index !== -1 ? "".concat(this.id).concat(utils.ObjectUtils.isNotEmpty(this.focusedItemInfo.parentKey) ? '_' + this.focusedItemInfo.parentKey : '', "_").concat(this.focusedItemInfo.index) : null;
    }
  },
  components: {
    TieredMenuSub: script$1,
    Portal: Portal__default["default"]
  }
};

var _hoisted_1 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TieredMenuSub = vue.resolveComponent("TieredMenuSub");
  var _component_Portal = vue.resolveComponent("Portal");
  return vue.openBlock(), vue.createBlock(_component_Portal, {
    appendTo: _ctx.appendTo,
    disabled: !_ctx.popup
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(vue.Transition, vue.mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, _ctx.ptm('transition')), {
        "default": vue.withCtx(function () {
          return [$data.visible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.containerRef,
            id: $data.id,
            "class": _ctx.cx('root'),
            onClick: _cache[0] || (_cache[0] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            })
          }, _ctx.ptmi('root')), [_ctx.$slots.start ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('start')
          }, _ctx.ptm('start')), [vue.renderSlot(_ctx.$slots, "start")], 16)) : vue.createCommentVNode("", true), vue.createVNode(_component_TieredMenuSub, {
            ref: $options.menubarRef,
            id: $data.id + '_list',
            tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
            role: "menubar",
            "aria-label": _ctx.ariaLabel,
            "aria-labelledby": _ctx.ariaLabelledby,
            "aria-disabled": _ctx.disabled || undefined,
            "aria-orientation": "vertical",
            "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
            menuId: $data.id,
            focusedItemId: $data.focused ? $options.focusedItemId : undefined,
            items: $options.processedItems,
            templates: _ctx.$slots,
            activeItemPath: $data.activeItemPath,
            level: 0,
            visible: $data.submenuVisible,
            pt: _ctx.pt,
            unstyled: _ctx.unstyled,
            onFocus: $options.onFocus,
            onBlur: $options.onBlur,
            onKeydown: $options.onKeyDown,
            onItemClick: $options.onItemClick,
            onItemMouseenter: $options.onItemMouseEnter,
            onItemMousemove: $options.onItemMouseMove
          }, null, 8, ["id", "tabindex", "aria-label", "aria-labelledby", "aria-disabled", "aria-activedescendant", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "visible", "pt", "unstyled", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter", "onItemMousemove"]), _ctx.$slots.end ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 1,
            "class": _ctx.cx('end')
          }, _ctx.ptm('end')), [vue.renderSlot(_ctx.$slots, "end")], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_1)) : vue.createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo", "disabled"]);
}

script.render = render;

module.exports = script;
