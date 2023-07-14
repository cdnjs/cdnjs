import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import { ObjectUtils, UniqueComponentId, ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import AngleRightIcon from 'primevue/icons/angleright';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, Fragment, renderList, createElementVNode, createBlock, withCtx, withDirectives, resolveDynamicComponent, normalizeClass, createCommentVNode, toDisplayString, normalizeStyle, createVNode, Transition } from 'vue';

var styles = "\n.p-tieredmenu ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.p-tieredmenu .p-submenu-list {\n    position: absolute;\n    min-width: 100%;\n    z-index: 1;\n    display: none;\n}\n\n.p-tieredmenu .p-menuitem-link {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-tieredmenu .p-menuitem-text {\n    line-height: 1;\n}\n\n.p-tieredmenu .p-menuitem {\n    position: relative;\n}\n\n.p-tieredmenu .p-menuitem-link .p-submenu-icon {\n    margin-left: auto;\n}\n\n.p-tieredmenu .p-menuitem-active > .p-submenu-list {\n    display: block;\n    left: 100%;\n    top: 0;\n}\n";
var inlineStyles = {
  submenu: function submenu(_ref) {
    var instance = _ref.instance,
      processedItem = _ref.processedItem;
    return {
      display: instance.isItemActive(processedItem) ? 'block' : 'none'
    };
  }
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-tieredmenu p-component', {
      'p-tieredmenu-overlay': props.popup,
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  menu: 'p-tieredmenu-root-list',
  menuitem: function menuitem(_ref3) {
    var instance = _ref3.instance,
      processedItem = _ref3.processedItem;
    return ['p-menuitem', {
      'p-menuitem-active p-highlight': instance.isItemActive(processedItem),
      'p-focus': instance.isItemFocused(processedItem),
      'p-disabled': instance.isItemDisabled(processedItem)
    }];
  },
  content: 'p-menuitem-content',
  action: function action(_ref4) {
    var props = _ref4.props,
      isActive = _ref4.isActive,
      isExactActive = _ref4.isExactActive;
    return ['p-menuitem-link', {
      'router-link-active': isActive,
      'router-link-active-exact': props.exact && isExactActive
    }];
  },
  icon: 'p-menuitem-icon',
  text: 'p-menuitem-text',
  submenuIcon: 'p-submenu-icon',
  submenu: 'p-submenu-list',
  separator: 'p-menuitem-separator'
};
var _useStyle = useStyle(styles, {
    name: 'tieredmenu',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$2 = {
  name: 'BaseTieredMenu',
  "extends": BaseComponent,
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
      type: String,
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
    exact: {
      type: Boolean,
      "default": true
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    'aria-labelledby': {
      type: String,
      "default": null
    },
    'aria-label': {
      type: String,
      "default": null
    }
  },
  css: {
    classes: classes,
    inlineStyles: inlineStyles,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$1 = {
  name: 'TieredMenuSub',
  hostName: 'TieredMenu',
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
    exact: {
      type: Boolean,
      "default": true
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
      return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    },
    getItemLabel: function getItemLabel(processedItem) {
      return this.getItemProp(processedItem, 'label');
    },
    getPTOptions: function getPTOptions(processedItem, key) {
      return this.ptm(key, {
        context: {
          active: this.isItemActive(processedItem),
          focused: this.isItemFocused(processedItem)
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
    onItemActionClick: function onItemActionClick(event, navigate) {
      navigate && navigate(event);
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
    }
  },
  components: {
    AngleRightIcon: AngleRightIcon
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1$1 = ["tabindex"];
var _hoisted_2 = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-level", "aria-setsize", "aria-posinset", "data-p-highlight", "data-p-focused", "data-p-disabled"];
var _hoisted_3 = ["onClick", "onMouseenter"];
var _hoisted_4 = ["href", "onClick"];
var _hoisted_5 = ["href", "target"];
var _hoisted_6 = ["id"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  var _component_AngleRightIcon = resolveComponent("AngleRightIcon");
  var _component_TieredMenuSub = resolveComponent("TieredMenuSub", true);
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("ul", mergeProps({
    "class": $props.level === 0 ? _ctx.cx('menu') : _ctx.cx('submenu'),
    tabindex: $props.tabindex
  }, $props.level === 0 ? _ctx.ptm('menu') : _ctx.ptm('submenu')), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.items, function (processedItem, index) {
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
    }, $options.getPTOptions(processedItem, 'menuitem'), {
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
    }, $options.getPTOptions(processedItem, 'content')), [!$props.templates.item ? (openBlock(), createElementBlock(Fragment, {
      key: 0
    }, [$options.getItemProp(processedItem, 'to') && !$options.isItemDisabled(processedItem) ? (openBlock(), createBlock(_component_router_link, {
      key: 0,
      to: $options.getItemProp(processedItem, 'to'),
      custom: ""
    }, {
      "default": withCtx(function (_ref) {
        var navigate = _ref.navigate,
          href = _ref.href,
          isActive = _ref.isActive,
          isExactActive = _ref.isExactActive;
        return [withDirectives((openBlock(), createElementBlock("a", mergeProps({
          href: href,
          "class": _ctx.cx('action', {
            isActive: isActive,
            isExactActive: isExactActive
          }),
          tabindex: "-1",
          "aria-hidden": "true",
          onClick: function onClick($event) {
            return $options.onItemActionClick($event, navigate);
          }
        }, $options.getPTOptions(processedItem, 'action')), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
          key: 0,
          item: processedItem.item,
          "class": normalizeClass([_ctx.cx('icon'), $options.getItemProp(processedItem, 'icon')])
        }, null, 8, ["item", "class"])) : $options.getItemProp(processedItem, 'icon') ? (openBlock(), createElementBlock("span", mergeProps({
          key: 1,
          "class": [_ctx.cx('icon'), $options.getItemProp(processedItem, 'icon')]
        }, $options.getPTOptions(processedItem, 'icon')), null, 16)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
          "class": _ctx.cx('label')
        }, $options.getPTOptions(processedItem, 'label')), toDisplayString($options.getItemLabel(processedItem)), 17)], 16, _hoisted_4)), [[_directive_ripple]])];
      }),
      _: 2
    }, 1032, ["to"])) : withDirectives((openBlock(), createElementBlock("a", mergeProps({
      key: 1,
      href: $options.getItemProp(processedItem, 'url'),
      "class": _ctx.cx('action'),
      target: $options.getItemProp(processedItem, 'target'),
      tabindex: "-1",
      "aria-hidden": "true"
    }, $options.getPTOptions(processedItem, 'action')), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
      key: 0,
      item: processedItem.item,
      "class": normalizeClass([_ctx.cx('icon'), $options.getItemProp(processedItem, 'icon')])
    }, null, 8, ["item", "class"])) : $options.getItemProp(processedItem, 'icon') ? (openBlock(), createElementBlock("span", mergeProps({
      key: 1,
      "class": [_ctx.cx('icon'), $options.getItemProp(processedItem, 'icon')]
    }, $options.getPTOptions(processedItem, 'icon')), null, 16)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
      "class": _ctx.cx('label')
    }, $options.getPTOptions(processedItem, 'label')), toDisplayString($options.getItemLabel(processedItem)), 17), $options.getItemProp(processedItem, 'items') ? (openBlock(), createElementBlock(Fragment, {
      key: 2
    }, [$props.templates.submenuicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.submenuicon), mergeProps({
      key: 0,
      "class": _ctx.cx('submenuIcon'),
      active: $options.isItemActive(processedItem)
    }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16, ["class", "active"])) : (openBlock(), createBlock(_component_AngleRightIcon, mergeProps({
      key: 1,
      "class": _ctx.cx('submenuIcon')
    }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16, ["class"]))], 64)) : createCommentVNode("", true)], 16, _hoisted_5)), [[_directive_ripple]])], 64)) : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
      key: 1,
      item: processedItem.item
    }, null, 8, ["item"]))], 16, _hoisted_3), $options.isItemVisible(processedItem) && $options.isItemGroup(processedItem) ? (openBlock(), createBlock(_component_TieredMenuSub, {
      key: 0,
      id: $options.getItemId(processedItem) + '_list',
      style: normalizeStyle(_ctx.sx('submenu', true, {
        processedItem: processedItem
      })),
      role: "menu",
      menuId: $props.menuId,
      focusedItemId: $props.focusedItemId,
      items: processedItem.items,
      templates: $props.templates,
      activeItemPath: $props.activeItemPath,
      exact: $props.exact,
      level: $props.level + 1,
      pt: _ctx.pt,
      onItemClick: _cache[0] || (_cache[0] = function ($event) {
        return _ctx.$emit('item-click', $event);
      }),
      onItemMouseenter: _cache[1] || (_cache[1] = function ($event) {
        return _ctx.$emit('item-mouseenter', $event);
      })
    }, null, 8, ["id", "style", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "exact", "level", "pt"])) : createCommentVNode("", true)], 16, _hoisted_2)) : createCommentVNode("", true), $options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator') ? (openBlock(), createElementBlock("li", mergeProps({
      key: 1,
      id: $options.getItemId(processedItem),
      style: $options.getItemProp(processedItem, 'style'),
      "class": [_ctx.cx('separator'), $options.getItemProp(processedItem, 'class')],
      role: "separator"
    }, _ctx.ptm('separator')), null, 16, _hoisted_6)) : createCommentVNode("", true)], 64);
  }), 128))], 16, _hoisted_1$1);
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
      dirty: false
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    activeItemPath: function activeItemPath(newPath) {
      if (!this.popup) {
        if (ObjectUtils.isNotEmpty(newPath)) {
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
    this.id = this.id || UniqueComponentId();
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.container && this.autoZIndex) {
      ZIndexUtils.clear(this.container);
    }
    this.target = null;
    this.container = null;
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
      this.visible ? this.hide(event, true) : this.show(event);
    },
    show: function show(event, isFocus) {
      if (this.popup) {
        this.$emit('before-show');
        this.visible = true;
        this.target = this.target || event.currentTarget;
        this.relatedTarget = event.relatedTarget || null;
      }
      this.focusedItemInfo = {
        index: this.findFirstFocusedItemIndex(),
        level: 0,
        parentKey: ''
      };
      isFocus && DomHandler.focus(this.menubar);
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
      isFocus && DomHandler.focus(this.relatedTarget || this.target || this.menubar);
      this.dirty = false;
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.focusedItemInfo = this.focusedItemInfo.index !== -1 ? this.focusedItemInfo : {
        index: this.findFirstFocusedItemIndex(),
        level: 0,
        parentKey: ''
      };
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
        level = processedItem.level,
        parentKey = processedItem.parentKey,
        items = processedItem.items;
      var grouped = ObjectUtils.isNotEmpty(items);
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
      isFocus && DomHandler.focus(this.menubar);
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit('overlay-click', {
        originalEvent: event,
        target: this.target
      });
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
        DomHandler.focus(this.menubar);
      } else {
        if (grouped) {
          this.onItemChange(event);
        } else {
          var rootProcessedItem = root ? processedItem : this.activeItemPath.find(function (p) {
            return p.parentKey === '';
          });
          this.hide(originalEvent);
          this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);
          DomHandler.focus(this.menubar);
        }
      }
    },
    onItemMouseEnter: function onItemMouseEnter(event) {
      if (this.dirty) {
        this.onItemChange(event);
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
      var root = ObjectUtils.isEmpty(processedItem.parent);
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
        var element = DomHandler.findSingle(this.menubar, "li[id=\"".concat("".concat(this.focusedItemId), "\"]"));
        var anchorElement = element && DomHandler.findSingle(element, '[data-pc-section="action"]');
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
      this.hide(event, true);
      !this.popup && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());
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
        ZIndexUtils.set('menu', el, this.baseZIndex + this.$primevue.config.zIndex.menu);
      }
      DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      this.alignOverlay();
      DomHandler.focus(this.menubar);
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
        ZIndexUtils.clear(el);
      }
    },
    alignOverlay: function alignOverlay() {
      this.container.style.minWidth = DomHandler.getOuterWidth(this.target) + 'px';
      DomHandler.absolutePosition(this.container, this.target);
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
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, function (event) {
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
          if (!DomHandler.isTouchDevice()) {
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
      return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
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
      var _this5 = this;
      return this.visibleItems.findIndex(function (processedItem) {
        return _this5.isValidItem(processedItem);
      });
    },
    findLastItemIndex: function findLastItemIndex() {
      var _this6 = this;
      return ObjectUtils.findLastIndex(this.visibleItems, function (processedItem) {
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
      var matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), function (processedItem) {
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
      var element = DomHandler.findSingle(this.menubar, "li[id=\"".concat(id, "\"]"));
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
      return this.focusedItemInfo.index !== -1 ? "".concat(this.id).concat(ObjectUtils.isNotEmpty(this.focusedItemInfo.parentKey) ? '_' + this.focusedItemInfo.parentKey : '', "_").concat(this.focusedItemInfo.index) : null;
    }
  },
  components: {
    TieredMenuSub: script$1,
    Portal: Portal
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TieredMenuSub = resolveComponent("TieredMenuSub");
  var _component_Portal = resolveComponent("Portal");
  return openBlock(), createBlock(_component_Portal, {
    appendTo: _ctx.appendTo,
    disabled: !_ctx.popup
  }, {
    "default": withCtx(function () {
      return [createVNode(Transition, {
        name: "p-connected-overlay",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, {
        "default": withCtx(function () {
          return [$data.visible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            id: $data.id,
            "class": _ctx.cx('root'),
            onClick: _cache[0] || (_cache[0] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.$attrs), _ctx.ptm('root')), {
            "data-pc-name": "tieredmenu"
          }), [createVNode(_component_TieredMenuSub, {
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
            exact: _ctx.exact,
            level: 0,
            pt: _ctx.pt,
            onFocus: $options.onFocus,
            onBlur: $options.onBlur,
            onKeydown: $options.onKeyDown,
            onItemClick: $options.onItemClick,
            onItemMouseenter: $options.onItemMouseEnter
          }, null, 8, ["id", "tabindex", "aria-label", "aria-labelledby", "aria-disabled", "aria-activedescendant", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "exact", "pt", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter"])], 16, _hoisted_1)) : createCommentVNode("", true)];
        }),
        _: 1
      }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 1
  }, 8, ["appendTo", "disabled"]);
}

script.render = render;

export { script as default };
