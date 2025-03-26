'use strict';

var ChevronDownIcon = require('primevue/icons/chevrondown');
var ChevronRightIcon = require('primevue/icons/chevronright');
var utils = require('primevue/utils');
var vue = require('vue');
var BaseComponent = require('primevue/basecomponent');
var PanelMenuStyle = require('primevue/panelmenu/style');
var Ripple = require('primevue/ripple');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var PanelMenuStyle__default = /*#__PURE__*/_interopDefaultLegacy(PanelMenuStyle);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script$3 = {
  name: 'BasePanelMenu',
  "extends": BaseComponent__default["default"],
  props: {
    model: {
      type: Array,
      "default": null
    },
    expandedKeys: {
      type: Object,
      "default": null
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
    }
  },
  style: PanelMenuStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$2 = {
  name: 'PanelMenuSub',
  hostName: 'PanelMenu',
  "extends": BaseComponent__default["default"],
  emits: ['item-toggle', 'item-mousemove'],
  props: {
    panelId: {
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
      "default": -1
    }
  },
  methods: {
    getItemId: function getItemId(processedItem) {
      return "".concat(this.panelId, "_").concat(processedItem.key);
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
    getPTOptions: function getPTOptions(key, processedItem, index) {
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
    onItemClick: function onItemClick(event, processedItem) {
      this.getItemProp(processedItem, 'command', {
        originalEvent: event,
        item: processedItem.item
      });
      this.$emit('item-toggle', {
        processedItem: processedItem,
        expanded: !this.isItemActive(processedItem)
      });
    },
    onItemToggle: function onItemToggle(event) {
      this.$emit('item-toggle', event);
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
        }, this.getPTOptions('action', processedItem, index)),
        icon: vue.mergeProps({
          "class": [this.cx('icon'), this.getItemProp(processedItem, 'icon')]
        }, this.getPTOptions('icon', processedItem, index)),
        label: vue.mergeProps({
          "class": this.cx('label')
        }, this.getPTOptions('label', processedItem, index)),
        submenuicon: vue.mergeProps({
          "class": this.cx('submenuIcon')
        }, this.getPTOptions('submenuicon', processedItem, index))
      };
    }
  },
  components: {
    ChevronRightIcon: ChevronRightIcon__default["default"],
    ChevronDownIcon: ChevronDownIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

var _hoisted_1$1 = ["tabindex"];
var _hoisted_2$1 = ["id", "aria-label", "aria-expanded", "aria-level", "aria-setsize", "aria-posinset", "data-p-focused", "data-p-disabled"];
var _hoisted_3$1 = ["onClick", "onMousemove"];
var _hoisted_4$1 = ["href", "target"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PanelMenuSub = vue.resolveComponent("PanelMenuSub", true);
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("ul", {
    "class": vue.normalizeClass(_ctx.cx('submenu')),
    tabindex: $props.tabindex
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.items, function (processedItem, index) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: $options.getItemKey(processedItem)
    }, [$options.isItemVisible(processedItem) && !$options.getItemProp(processedItem, 'separator') ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: 0,
      id: $options.getItemId(processedItem),
      "class": [_ctx.cx('menuitem', {
        processedItem: processedItem
      }), $options.getItemProp(processedItem, 'class')],
      style: $options.getItemProp(processedItem, 'style'),
      role: "treeitem",
      "aria-label": $options.getItemLabel(processedItem),
      "aria-expanded": $options.isItemGroup(processedItem) ? $options.isItemActive(processedItem) : undefined,
      "aria-level": $props.level + 1,
      "aria-setsize": $options.getAriaSetSize(),
      "aria-posinset": $options.getAriaPosInset(index)
    }, $options.getPTOptions('menuitem', processedItem, index), {
      "data-p-focused": $options.isItemFocused(processedItem),
      "data-p-disabled": $options.isItemDisabled(processedItem)
    }), [vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('content'),
      onClick: function onClick($event) {
        return $options.onItemClick($event, processedItem);
      },
      onMousemove: function onMousemove($event) {
        return $options.onItemMouseMove($event, processedItem);
      }
    }, $options.getPTOptions('content', processedItem, index)), [!$props.templates.item ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
      key: 0,
      href: $options.getItemProp(processedItem, 'url'),
      "class": _ctx.cx('action'),
      target: $options.getItemProp(processedItem, 'target'),
      tabindex: "-1",
      "aria-hidden": "true"
    }, $options.getPTOptions('action', processedItem, index)), [$options.isItemGroup(processedItem) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 0
    }, [$props.templates.submenuicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.submenuicon), vue.mergeProps({
      key: 0,
      "class": _ctx.cx('submenuIcon'),
      active: $options.isItemActive(processedItem)
    }, $options.getPTOptions('submenuIcon', processedItem, index)), null, 16, ["class", "active"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.isItemActive(processedItem) ? 'ChevronDownIcon' : 'ChevronRightIcon'), vue.mergeProps({
      key: 1,
      "class": _ctx.cx('submenuIcon')
    }, $options.getPTOptions('submenuIcon', processedItem, index)), null, 16, ["class"]))], 64)) : vue.createCommentVNode("", true), $props.templates.itemicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
      key: 1,
      item: processedItem.item,
      "class": vue.normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["item", "class"])) : $options.getItemProp(processedItem, 'icon') ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 2,
      "class": [_ctx.cx('icon'), $options.getItemProp(processedItem, 'icon')]
    }, $options.getPTOptions('icon', processedItem, index)), null, 16)) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('label')
    }, $options.getPTOptions('label', processedItem, index)), vue.toDisplayString($options.getItemLabel(processedItem)), 17)], 16, _hoisted_4$1)), [[_directive_ripple]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
      key: 1,
      item: processedItem.item,
      root: false,
      active: $options.isItemActive(processedItem),
      hasSubmenu: $options.isItemGroup(processedItem),
      label: $options.getItemLabel(processedItem),
      props: $options.getMenuItemProps(processedItem, index)
    }, null, 8, ["item", "active", "hasSubmenu", "label", "props"]))], 16, _hoisted_3$1), vue.createVNode(vue.Transition, vue.mergeProps({
      name: "p-toggleable-content"
    }, _ctx.ptm('transition')), {
      "default": vue.withCtx(function () {
        return [vue.withDirectives(vue.createElementVNode("div", vue.mergeProps({
          "class": _ctx.cx('toggleableContent')
        }, _ctx.ptm('toggleableContent')), [$options.isItemVisible(processedItem) && $options.isItemGroup(processedItem) ? (vue.openBlock(), vue.createBlock(_component_PanelMenuSub, vue.mergeProps({
          key: 0,
          id: $options.getItemId(processedItem) + '_list',
          role: "group",
          panelId: $props.panelId,
          focusedItemId: $props.focusedItemId,
          items: processedItem.items,
          level: $props.level + 1,
          templates: $props.templates,
          activeItemPath: $props.activeItemPath,
          onItemToggle: $options.onItemToggle,
          onItemMousemove: _cache[0] || (_cache[0] = function ($event) {
            return _ctx.$emit('item-mousemove', $event);
          }),
          pt: _ctx.pt,
          unstyled: _ctx.unstyled
        }, _ctx.ptm('submenu')), null, 16, ["id", "panelId", "focusedItemId", "items", "level", "templates", "activeItemPath", "onItemToggle", "pt", "unstyled"])) : vue.createCommentVNode("", true)], 16), [[vue.vShow, $options.isItemActive(processedItem)]])];
      }),
      _: 2
    }, 1040)], 16, _hoisted_2$1)) : vue.createCommentVNode("", true), $options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator') ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: 1,
      style: $options.getItemProp(processedItem, 'style'),
      "class": [_ctx.cx('separator'), $options.getItemProp(processedItem, 'class')],
      role: "separator"
    }, _ctx.ptm('separator')), null, 16)) : vue.createCommentVNode("", true)], 64);
  }), 128))], 10, _hoisted_1$1);
}

script$2.render = render$2;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var script$1 = {
  name: 'PanelMenuList',
  hostName: 'PanelMenu',
  "extends": BaseComponent__default["default"],
  emits: ['item-toggle', 'header-focus'],
  props: {
    panelId: {
      type: String,
      "default": null
    },
    items: {
      type: Array,
      "default": null
    },
    templates: {
      type: Object,
      "default": null
    },
    expandedKeys: {
      type: Object,
      "default": null
    }
  },
  searchTimeout: null,
  searchValue: null,
  data: function data() {
    return {
      focused: false,
      focusedItem: null,
      activeItemPath: []
    };
  },
  watch: {
    expandedKeys: function expandedKeys(newValue) {
      this.autoUpdateActiveItemPath(newValue);
    }
  },
  mounted: function mounted() {
    this.autoUpdateActiveItemPath(this.expandedKeys);
  },
  methods: {
    getItemProp: function getItemProp(processedItem, name) {
      return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    },
    getItemLabel: function getItemLabel(processedItem) {
      return this.getItemProp(processedItem, 'label');
    },
    isItemVisible: function isItemVisible(processedItem) {
      return this.getItemProp(processedItem, 'visible') !== false;
    },
    isItemDisabled: function isItemDisabled(processedItem) {
      return this.getItemProp(processedItem, 'disabled');
    },
    isItemActive: function isItemActive(processedItem) {
      return this.activeItemPath.some(function (path) {
        return path.key === processedItem.parentKey;
      });
    },
    isItemGroup: function isItemGroup(processedItem) {
      return utils.ObjectUtils.isNotEmpty(processedItem.items);
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.focusedItem = this.focusedItem || (this.isElementInPanel(event, event.relatedTarget) ? this.findFirstItem() : this.findLastItem());
    },
    onBlur: function onBlur() {
      this.focused = false;
      this.focusedItem = null;
      this.searchValue = '';
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
        case 'Tab':
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
    onArrowDownKey: function onArrowDownKey(event) {
      var processedItem = utils.ObjectUtils.isNotEmpty(this.focusedItem) ? this.findNextItem(this.focusedItem) : this.findFirstItem();
      this.changeFocusedItem({
        originalEvent: event,
        processedItem: processedItem,
        focusOnNext: true
      });
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      var processedItem = utils.ObjectUtils.isNotEmpty(this.focusedItem) ? this.findPrevItem(this.focusedItem) : this.findLastItem();
      this.changeFocusedItem({
        originalEvent: event,
        processedItem: processedItem,
        selfCheck: true
      });
      event.preventDefault();
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var _this = this;
      if (utils.ObjectUtils.isNotEmpty(this.focusedItem)) {
        var matched = this.activeItemPath.some(function (p) {
          return p.key === _this.focusedItem.key;
        });
        if (matched) {
          this.activeItemPath = this.activeItemPath.filter(function (p) {
            return p.key !== _this.focusedItem.key;
          });
        } else {
          this.focusedItem = utils.ObjectUtils.isNotEmpty(this.focusedItem.parent) ? this.focusedItem.parent : this.focusedItem;
        }
        event.preventDefault();
      }
    },
    onArrowRightKey: function onArrowRightKey(event) {
      var _this2 = this;
      if (utils.ObjectUtils.isNotEmpty(this.focusedItem)) {
        var grouped = this.isItemGroup(this.focusedItem);
        if (grouped) {
          var matched = this.activeItemPath.some(function (p) {
            return p.key === _this2.focusedItem.key;
          });
          if (matched) {
            this.onArrowDownKey(event);
          } else {
            this.activeItemPath = this.activeItemPath.filter(function (p) {
              return p.parentKey !== _this2.focusedItem.parentKey;
            });
            this.activeItemPath.push(this.focusedItem);
          }
        }
        event.preventDefault();
      }
    },
    onHomeKey: function onHomeKey(event) {
      this.changeFocusedItem({
        originalEvent: event,
        processedItem: this.findFirstItem(),
        allowHeaderFocus: false
      });
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      this.changeFocusedItem({
        originalEvent: event,
        processedItem: this.findLastItem(),
        focusOnNext: true,
        allowHeaderFocus: false
      });
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      if (utils.ObjectUtils.isNotEmpty(this.focusedItem)) {
        var element = utils.DomHandler.findSingle(this.$el, "li[id=\"".concat("".concat(this.focusedItemId), "\"]"));
        var anchorElement = element && (utils.DomHandler.findSingle(element, '[data-pc-section="action"]') || utils.DomHandler.findSingle(element, 'a,button'));
        anchorElement ? anchorElement.click() : element && element.click();
      }
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event) {
      this.onEnterKey(event);
    },
    onItemToggle: function onItemToggle(event) {
      var processedItem = event.processedItem,
        expanded = event.expanded;
      if (this.expandedKeys) {
        this.$emit('item-toggle', {
          item: processedItem.item,
          expanded: expanded
        });
      } else {
        this.activeItemPath = this.activeItemPath.filter(function (p) {
          return p.parentKey !== processedItem.parentKey;
        });
        expanded && this.activeItemPath.push(processedItem);
      }
      this.focusedItem = processedItem;
      utils.DomHandler.focus(this.$el);
    },
    onItemMouseMove: function onItemMouseMove(event) {
      if (this.focused) {
        this.focusedItem = event.processedItem;
      }
    },
    isElementInPanel: function isElementInPanel(event, element) {
      var panel = event.currentTarget.closest('[data-pc-section="panel"]');
      return panel && panel.contains(element);
    },
    isItemMatched: function isItemMatched(processedItem) {
      var _this$getItemLabel;
      return this.isValidItem(processedItem) && ((_this$getItemLabel = this.getItemLabel(processedItem)) === null || _this$getItemLabel === void 0 ? void 0 : _this$getItemLabel.toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale)));
    },
    isVisibleItem: function isVisibleItem(processedItem) {
      return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    },
    isValidItem: function isValidItem(processedItem) {
      return !!processedItem && !this.isItemDisabled(processedItem) && !this.getItemProp(processedItem, 'separator');
    },
    findFirstItem: function findFirstItem() {
      var _this3 = this;
      return this.visibleItems.find(function (processedItem) {
        return _this3.isValidItem(processedItem);
      });
    },
    findLastItem: function findLastItem() {
      var _this4 = this;
      return utils.ObjectUtils.findLast(this.visibleItems, function (processedItem) {
        return _this4.isValidItem(processedItem);
      });
    },
    findNextItem: function findNextItem(processedItem) {
      var _this5 = this;
      var index = this.visibleItems.findIndex(function (item) {
        return item.key === processedItem.key;
      });
      var matchedItem = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).find(function (pItem) {
        return _this5.isValidItem(pItem);
      }) : undefined;
      return matchedItem || processedItem;
    },
    findPrevItem: function findPrevItem(processedItem) {
      var _this6 = this;
      var index = this.visibleItems.findIndex(function (item) {
        return item.key === processedItem.key;
      });
      var matchedItem = index > 0 ? utils.ObjectUtils.findLast(this.visibleItems.slice(0, index), function (pItem) {
        return _this6.isValidItem(pItem);
      }) : undefined;
      return matchedItem || processedItem;
    },
    searchItems: function searchItems(event, _char) {
      var _this7 = this;
      this.searchValue = (this.searchValue || '') + _char;
      var matchedItem = null;
      var matched = false;
      if (utils.ObjectUtils.isNotEmpty(this.focusedItem)) {
        var focusedItemIndex = this.visibleItems.findIndex(function (processedItem) {
          return processedItem.key === _this7.focusedItem.key;
        });
        matchedItem = this.visibleItems.slice(focusedItemIndex).find(function (processedItem) {
          return _this7.isItemMatched(processedItem);
        });
        matchedItem = utils.ObjectUtils.isEmpty(matchedItem) ? this.visibleItems.slice(0, focusedItemIndex).find(function (processedItem) {
          return _this7.isItemMatched(processedItem);
        }) : matchedItem;
      } else {
        matchedItem = this.visibleItems.find(function (processedItem) {
          return _this7.isItemMatched(processedItem);
        });
      }
      if (utils.ObjectUtils.isNotEmpty(matchedItem)) {
        matched = true;
      }
      if (utils.ObjectUtils.isEmpty(matchedItem) && utils.ObjectUtils.isEmpty(this.focusedItem)) {
        matchedItem = this.findFirstItem();
      }
      if (utils.ObjectUtils.isNotEmpty(matchedItem)) {
        this.changeFocusedItem({
          originalEvent: event,
          processedItem: matchedItem,
          allowHeaderFocus: false
        });
      }
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(function () {
        _this7.searchValue = '';
        _this7.searchTimeout = null;
      }, 500);
      return matched;
    },
    changeFocusedItem: function changeFocusedItem(event) {
      var originalEvent = event.originalEvent,
        processedItem = event.processedItem,
        focusOnNext = event.focusOnNext,
        selfCheck = event.selfCheck,
        _event$allowHeaderFoc = event.allowHeaderFocus,
        allowHeaderFocus = _event$allowHeaderFoc === void 0 ? true : _event$allowHeaderFoc;
      if (utils.ObjectUtils.isNotEmpty(this.focusedItem) && this.focusedItem.key !== processedItem.key) {
        this.focusedItem = processedItem;
        this.scrollInView();
      } else if (allowHeaderFocus) {
        this.$emit('header-focus', {
          originalEvent: originalEvent,
          focusOnNext: focusOnNext,
          selfCheck: selfCheck
        });
      }
    },
    scrollInView: function scrollInView() {
      var element = utils.DomHandler.findSingle(this.$el, "li[id=\"".concat("".concat(this.focusedItemId), "\"]"));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      }
    },
    autoUpdateActiveItemPath: function autoUpdateActiveItemPath(expandedKeys) {
      var _this8 = this;
      this.activeItemPath = Object.entries(expandedKeys || {}).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          val = _ref2[1];
        if (val) {
          var processedItem = _this8.findProcessedItemByItemKey(key);
          processedItem && acc.push(processedItem);
        }
        return acc;
      }, []);
    },
    findProcessedItemByItemKey: function findProcessedItemByItemKey(key, processedItems) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      processedItems = processedItems || level === 0 && this.processedItems;
      if (!processedItems) return null;
      for (var i = 0; i < processedItems.length; i++) {
        var processedItem = processedItems[i];
        if (this.getItemProp(processedItem, 'key') === key) return processedItem;
        var matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
        if (matchedItem) return matchedItem;
      }
    },
    createProcessedItems: function createProcessedItems(items) {
      var _this9 = this;
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
        newItem['items'] = _this9.createProcessedItems(item.items, level + 1, newItem, key);
        processedItems.push(newItem);
      });
      return processedItems;
    },
    flatItems: function flatItems(processedItems) {
      var _this10 = this;
      var processedFlattenItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      processedItems && processedItems.forEach(function (processedItem) {
        if (_this10.isVisibleItem(processedItem)) {
          processedFlattenItems.push(processedItem);
          _this10.flatItems(processedItem.items, processedFlattenItems);
        }
      });
      return processedFlattenItems;
    }
  },
  computed: {
    processedItems: function processedItems() {
      return this.createProcessedItems(this.items || []);
    },
    visibleItems: function visibleItems() {
      return this.flatItems(this.processedItems);
    },
    focusedItemId: function focusedItemId() {
      return utils.ObjectUtils.isNotEmpty(this.focusedItem) ? "".concat(this.panelId, "_").concat(this.focusedItem.key) : null;
    }
  },
  components: {
    PanelMenuSub: script$2
  }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PanelMenuSub = vue.resolveComponent("PanelMenuSub");
  return vue.openBlock(), vue.createBlock(_component_PanelMenuSub, vue.mergeProps({
    id: $props.panelId + '_list',
    "class": _ctx.cx('menu'),
    role: "tree",
    tabindex: -1,
    "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
    panelId: $props.panelId,
    focusedItemId: $data.focused ? $options.focusedItemId : undefined,
    items: $options.processedItems,
    templates: $props.templates,
    activeItemPath: $data.activeItemPath,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeydown: $options.onKeyDown,
    onItemToggle: $options.onItemToggle,
    onItemMousemove: $options.onItemMouseMove,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, _ctx.ptm('menu')), null, 16, ["id", "class", "aria-activedescendant", "panelId", "focusedItemId", "items", "templates", "activeItemPath", "onFocus", "onBlur", "onKeydown", "onItemToggle", "onItemMousemove", "pt", "unstyled"]);
}

script$1.render = render$1;

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var script = {
  name: 'PanelMenu',
  "extends": script$3,
  inheritAttrs: false,
  emits: ['update:expandedKeys', 'panel-open', 'panel-close'],
  data: function data() {
    return {
      id: this.$attrs.id,
      activeItem: null,
      activeItems: []
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
  },
  methods: {
    getItemProp: function getItemProp(item, name) {
      return item ? utils.ObjectUtils.getItemValue(item[name]) : undefined;
    },
    getItemLabel: function getItemLabel(item) {
      return this.getItemProp(item, 'label');
    },
    getPTOptions: function getPTOptions(key, item, index) {
      return this.ptm(key, {
        context: {
          index: index,
          active: this.isItemActive(item),
          focused: this.isItemFocused(item),
          disabled: this.isItemDisabled(item)
        }
      });
    },
    isItemActive: function isItemActive(item) {
      return this.expandedKeys ? this.expandedKeys[this.getItemProp(item, 'key')] : this.multiple ? this.activeItems.some(function (subItem) {
        return utils.ObjectUtils.equals(item, subItem);
      }) : utils.ObjectUtils.equals(item, this.activeItem);
    },
    isItemVisible: function isItemVisible(item) {
      return this.getItemProp(item, 'visible') !== false;
    },
    isItemDisabled: function isItemDisabled(item) {
      return this.getItemProp(item, 'disabled');
    },
    isItemFocused: function isItemFocused(item) {
      return utils.ObjectUtils.equals(item, this.activeItem);
    },
    getPanelId: function getPanelId(index) {
      return "".concat(this.id, "_").concat(index);
    },
    getPanelKey: function getPanelKey(index) {
      return this.getPanelId(index);
    },
    getHeaderId: function getHeaderId(index) {
      return "".concat(this.getPanelId(index), "_header");
    },
    getContentId: function getContentId(index) {
      return "".concat(this.getPanelId(index), "_content");
    },
    onHeaderClick: function onHeaderClick(event, item) {
      if (this.isItemDisabled(item)) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      this.changeActiveItem(event, item);
      utils.DomHandler.focus(event.currentTarget);
    },
    onHeaderKeyDown: function onHeaderKeyDown(event, item) {
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
        case 'NumpadEnter':
        case 'Space':
          this.onHeaderEnterKey(event, item);
          break;
      }
    },
    onHeaderArrowDownKey: function onHeaderArrowDownKey(event) {
      var rootList = utils.DomHandler.getAttribute(event.currentTarget, 'data-p-highlight') === true ? utils.DomHandler.findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;
      rootList ? utils.DomHandler.focus(rootList) : this.updateFocusedHeader({
        originalEvent: event,
        focusOnNext: true
      });
      event.preventDefault();
    },
    onHeaderArrowUpKey: function onHeaderArrowUpKey(event) {
      var prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
      var rootList = utils.DomHandler.getAttribute(prevHeader, 'data-p-highlight') === true ? utils.DomHandler.findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;
      rootList ? utils.DomHandler.focus(rootList) : this.updateFocusedHeader({
        originalEvent: event,
        focusOnNext: false
      });
      event.preventDefault();
    },
    onHeaderHomeKey: function onHeaderHomeKey(event) {
      this.changeFocusedHeader(event, this.findFirstHeader());
      event.preventDefault();
    },
    onHeaderEndKey: function onHeaderEndKey(event) {
      this.changeFocusedHeader(event, this.findLastHeader());
      event.preventDefault();
    },
    onHeaderEnterKey: function onHeaderEnterKey(event, item) {
      var headerAction = utils.DomHandler.findSingle(event.currentTarget, '[data-pc-section="headeraction"]');
      headerAction ? headerAction.click() : this.onHeaderClick(event, item);
      event.preventDefault();
    },
    findNextHeader: function findNextHeader(panelElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
      var headerElement = utils.DomHandler.findSingle(nextPanelElement, '[data-pc-section="header"]');
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement : null;
    },
    findPrevHeader: function findPrevHeader(panelElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
      var headerElement = utils.DomHandler.findSingle(prevPanelElement, '[data-pc-section="header"]');
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement : null;
    },
    findFirstHeader: function findFirstHeader() {
      return this.findNextHeader(this.$el.firstElementChild, true);
    },
    findLastHeader: function findLastHeader() {
      return this.findPrevHeader(this.$el.lastElementChild, true);
    },
    updateFocusedHeader: function updateFocusedHeader(event) {
      var originalEvent = event.originalEvent,
        focusOnNext = event.focusOnNext,
        selfCheck = event.selfCheck;
      var panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
      var header = selfCheck ? utils.DomHandler.findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);
      header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    },
    changeActiveItem: function changeActiveItem(event, item) {
      var selfActive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!this.isItemDisabled(item)) {
        var active = this.isItemActive(item);
        var eventName = !active ? 'panel-open' : 'panel-close';
        this.activeItem = selfActive ? item : this.activeItem && utils.ObjectUtils.equals(item, this.activeItem) ? null : item;
        if (this.multiple) {
          // activeItem and activeItems should be separated because it should be only one focused root item
          if (this.activeItems.some(function (subItem) {
            return utils.ObjectUtils.equals(item, subItem);
          })) {
            this.activeItems = this.activeItems.filter(function (subItem) {
              return !utils.ObjectUtils.equals(item, subItem);
            });
          } else {
            this.activeItems.push(item);
          }
        }
        this.changeExpandedKeys({
          item: item,
          expanded: !active
        });
        this.$emit(eventName, {
          originalEvent: event,
          item: item
        });
      }
    },
    changeExpandedKeys: function changeExpandedKeys(_ref) {
      var item = _ref.item,
        _ref$expanded = _ref.expanded,
        expanded = _ref$expanded === void 0 ? false : _ref$expanded;
      if (this.expandedKeys) {
        var _keys = _objectSpread({}, this.expandedKeys);
        if (expanded) _keys[item.key] = true;else delete _keys[item.key];
        this.$emit('update:expandedKeys', _keys);
      }
    },
    changeFocusedHeader: function changeFocusedHeader(event, element) {
      element && utils.DomHandler.focus(element);
    },
    getMenuItemProps: function getMenuItemProps(item, index) {
      return {
        icon: vue.mergeProps({
          "class": [this.cx('headerIcon'), this.getItemProp(item, 'icon')]
        }, this.getPTOptions('headerIcon', item, index)),
        label: vue.mergeProps({
          "class": this.cx('headerLabel')
        }, this.getPTOptions('headerLabel', item, index))
      };
    }
  },
  components: {
    PanelMenuList: script$1,
    ChevronRightIcon: ChevronRightIcon__default["default"],
    ChevronDownIcon: ChevronDownIcon__default["default"]
  }
};

var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "tabindex", "aria-label", "aria-expanded", "aria-controls", "aria-disabled", "onClick", "onKeydown", "data-p-highlight", "data-p-disabled"];
var _hoisted_3 = ["href"];
var _hoisted_4 = ["id", "aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PanelMenuList = vue.resolveComponent("PanelMenuList");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    id: $data.id,
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.model, function (item, index) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: $options.getPanelKey(index)
    }, [$options.isItemVisible(item) ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: 0,
      style: $options.getItemProp(item, 'style'),
      "class": [_ctx.cx('panel'), $options.getItemProp(item, 'class')]
    }, _ctx.ptm('panel')), [vue.createElementVNode("div", vue.mergeProps({
      id: $options.getHeaderId(index),
      "class": [_ctx.cx('header', {
        item: item
      }), $options.getItemProp(item, 'headerClass')],
      tabindex: $options.isItemDisabled(item) ? -1 : _ctx.tabindex,
      role: "button",
      "aria-label": $options.getItemLabel(item),
      "aria-expanded": $options.isItemActive(item),
      "aria-controls": $options.getContentId(index),
      "aria-disabled": $options.isItemDisabled(item),
      onClick: function onClick($event) {
        return $options.onHeaderClick($event, item);
      },
      onKeydown: function onKeydown($event) {
        return $options.onHeaderKeyDown($event, item);
      }
    }, $options.getPTOptions('header', item, index), {
      "data-p-highlight": $options.isItemActive(item),
      "data-p-disabled": $options.isItemDisabled(item)
    }), [vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('headerContent')
    }, $options.getPTOptions('headerContent', item, index)), [!_ctx.$slots.item ? (vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
      key: 0,
      href: $options.getItemProp(item, 'url'),
      "class": _ctx.cx('headerAction'),
      tabindex: -1
    }, $options.getPTOptions('headerAction', item, index)), [$options.getItemProp(item, 'items') ? vue.renderSlot(_ctx.$slots, "submenuicon", {
      key: 0,
      active: $options.isItemActive(item)
    }, function () {
      return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.isItemActive(item) ? 'ChevronDownIcon' : 'ChevronRightIcon'), vue.mergeProps({
        "class": _ctx.cx('submenuIcon')
      }, $options.getPTOptions('submenuIcon', item, index)), null, 16, ["class"]))];
    }) : vue.createCommentVNode("", true), _ctx.$slots.headericon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.headericon), {
      key: 1,
      item: item,
      "class": vue.normalizeClass([_ctx.cx('headerIcon'), $options.getItemProp(item, 'icon')])
    }, null, 8, ["item", "class"])) : $options.getItemProp(item, 'icon') ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 2,
      "class": [_ctx.cx('headerIcon'), $options.getItemProp(item, 'icon')]
    }, $options.getPTOptions('headerIcon', item, index)), null, 16)) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('headerLabel')
    }, $options.getPTOptions('headerLabel', item, index)), vue.toDisplayString($options.getItemLabel(item)), 17)], 16, _hoisted_3)) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.item), {
      key: 1,
      item: item,
      root: true,
      active: $options.isItemActive(item),
      hasSubmenu: $options.getItemProp(item, 'items'),
      label: $options.getItemLabel(item),
      props: $options.getMenuItemProps(item, index)
    }, null, 8, ["item", "active", "hasSubmenu", "label", "props"]))], 16)], 16, _hoisted_2), vue.createVNode(vue.Transition, vue.mergeProps({
      name: "p-toggleable-content"
    }, _ctx.ptm('transition')), {
      "default": vue.withCtx(function () {
        return [vue.withDirectives(vue.createElementVNode("div", vue.mergeProps({
          id: $options.getContentId(index),
          "class": _ctx.cx('toggleableContent'),
          role: "region",
          "aria-labelledby": $options.getHeaderId(index)
        }, _ctx.ptm('toggleableContent')), [$options.getItemProp(item, 'items') ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 0,
          "class": _ctx.cx('menuContent')
        }, _ctx.ptm('menuContent')), [vue.createVNode(_component_PanelMenuList, {
          panelId: $options.getPanelId(index),
          items: $options.getItemProp(item, 'items'),
          templates: _ctx.$slots,
          expandedKeys: _ctx.expandedKeys,
          onItemToggle: $options.changeExpandedKeys,
          onHeaderFocus: $options.updateFocusedHeader,
          pt: _ctx.pt,
          unstyled: _ctx.unstyled
        }, null, 8, ["panelId", "items", "templates", "expandedKeys", "onItemToggle", "onHeaderFocus", "pt", "unstyled"])], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_4), [[vue.vShow, $options.isItemActive(item)]])];
      }),
      _: 2
    }, 1040)], 16)) : vue.createCommentVNode("", true)], 64);
  }), 128))], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
