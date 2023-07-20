import { ObjectUtils, UniqueComponentId, DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import AngleDownIcon from 'primevue/icons/angledown';
import AngleRightIcon from 'primevue/icons/angleright';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, toDisplayString, createCommentVNode, Fragment, renderList, createElementVNode, createBlock, withCtx, withDirectives, resolveDynamicComponent, normalizeClass, normalizeStyle, renderSlot, createVNode } from 'vue';

var styles = "\n.p-megamenu {\n    display: flex;\n}\n\n.p-megamenu-root-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.p-megamenu-root-list > .p-menuitem {\n    position: relative;\n}\n\n.p-megamenu .p-menuitem-link {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-megamenu .p-menuitem-text {\n    line-height: 1;\n}\n\n.p-megamenu-panel {\n    display: none;\n    position: absolute;\n    width: auto;\n    z-index: 1;\n}\n\n.p-megamenu-root-list > .p-menuitem-active > .p-megamenu-panel {\n    display: block;\n}\n\n.p-megamenu-submenu {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n/* Horizontal */\n.p-megamenu-horizontal {\n    align-items: center;\n}\n\n.p-megamenu-horizontal .p-megamenu-root-list {\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n}\n\n.p-megamenu-horizontal .p-megamenu-end {\n    margin-left: auto;\n    align-self: center;\n}\n\n/* Vertical */\n.p-megamenu-vertical {\n    flex-direction: column;\n}\n\n.p-megamenu-vertical .p-megamenu-root-list {\n    flex-direction: column;\n}\n\n.p-megamenu-vertical .p-megamenu-root-list > .p-menuitem-active > .p-megamenu-panel {\n    left: 100%;\n    top: 0;\n}\n\n.p-megamenu-vertical .p-megamenu-root-list > .p-menuitem > .p-menuitem-content > .p-menuitem-link > .p-submenu-icon {\n    margin-left: auto;\n}\n\n.p-megamenu-grid {\n    display: flex;\n}\n\n.p-megamenu-col-2,\n.p-megamenu-col-3,\n.p-megamenu-col-4,\n.p-megamenu-col-6,\n.p-megamenu-col-12 {\n    flex: 0 0 auto;\n    padding: 0.5rem;\n}\n\n.p-megamenu-col-2 {\n    width: 16.6667%;\n}\n\n.p-megamenu-col-3 {\n    width: 25%;\n}\n\n.p-megamenu-col-4 {\n    width: 33.3333%;\n}\n\n.p-megamenu-col-6 {\n    width: 50%;\n}\n\n.p-megamenu-col-12 {\n    width: 100%;\n}\n";
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
    var instance = _ref2.instance;
    return ['p-megamenu p-component', {
      'p-megamenu-horizontal': instance.horizontal,
      'p-megamenu-vertical': instance.vertical
    }];
  },
  start: 'p-megamenu-start',
  menu: 'p-megamenu-root-list',
  submenuHeader: function submenuHeader(_ref3) {
    var instance = _ref3.instance,
      processedItem = _ref3.processedItem;
    return ['p-megamenu-submenu-header p-submenu-header', {
      'p-disabled': instance.isItemDisabled(processedItem)
    }];
  },
  menuitem: function menuitem(_ref4) {
    var instance = _ref4.instance,
      processedItem = _ref4.processedItem;
    return ['p-menuitem', {
      'p-menuitem-active p-highlight': instance.isItemActive(processedItem),
      'p-focus': instance.isItemFocused(processedItem),
      'p-disabled': instance.isItemDisabled(processedItem)
    }];
  },
  content: 'p-menuitem-content',
  action: function action(_ref5) {
    var props = _ref5.props,
      isActive = _ref5.isActive,
      isExactActive = _ref5.isExactActive;
    return ['p-menuitem-link', {
      'router-link-active': isActive,
      'router-link-active-exact': props.exact && isExactActive
    }];
  },
  icon: 'p-menuitem-icon',
  label: 'p-menuitem-text',
  submenuIcon: 'p-submenu-icon',
  panel: 'p-megamenu-panel',
  grid: 'p-megamenu-grid',
  column: function column(_ref6) {
    var instance = _ref6.instance,
      processedItem = _ref6.processedItem;
    var length = instance.isItemGroup(processedItem) ? processedItem.items.length : 0;
    var columnClass;
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
  submenu: 'p-submenu-list p-megamenu-submenu',
  separator: 'p-menuitem-separator',
  end: 'p-megamenu-end'
};
var _useStyle = useStyle(styles, {
    name: 'megamenu',
    manual: true
  }),
  loadStyle = _useStyle.load;
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
    getPTOptions: function getPTOptions(processedItem, key) {
      return this.ptm(key, {
        context: {
          active: this.isItemActive(processedItem),
          focused: this.isItemFocused(processedItem)
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
    AngleRightIcon: AngleRightIcon,
    AngleDownIcon: AngleDownIcon
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
          "class": _ctx.cx('text')
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
      "class": _ctx.cx('text')
    }, $options.getPTOptions(processedItem, 'label')), toDisplayString($options.getItemLabel(processedItem)), 17), $options.isItemGroup(processedItem) ? (openBlock(), createElementBlock(Fragment, {
      key: 2
    }, [$props.templates.submenuicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.submenuicon), mergeProps({
      key: 0,
      active: $options.isItemActive(processedItem),
      "class": _ctx.cx('submenuIcon')
    }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16, ["active", "class"])) : (openBlock(), createBlock(resolveDynamicComponent($props.horizontal ? 'AngleDownIcon' : 'AngleRightIcon'), mergeProps({
      key: 1,
      "class": _ctx.cx('submenuIcon')
    }, $options.getPTOptions(processedItem, 'submenuIcon')), null, 16, ["class"]))], 64)) : createCommentVNode("", true)], 16, _hoisted_5)), [[_directive_ripple]])], 64)) : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
      key: 1,
      item: processedItem.item
    }, null, 8, ["item"]))], 16, _hoisted_3), $options.isItemVisible(processedItem) && $options.isItemGroup(processedItem) ? (openBlock(), createElementBlock("div", mergeProps({
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
          exact: $props.exact,
          level: $props.level + 1,
          pt: _ctx.pt,
          onItemClick: _cache[0] || (_cache[0] = function ($event) {
            return _ctx.$emit('item-click', $event);
          }),
          onItemMouseenter: _cache[1] || (_cache[1] = function ($event) {
            return _ctx.$emit('item-mouseenter', $event);
          })
        }, null, 8, ["id", "style", "menuId", "focusedItemId", "submenu", "items", "templates", "exact", "level", "pt"]);
      }), 128))], 16);
    }), 128))], 16)], 16)) : createCommentVNode("", true)], 16, _hoisted_2)) : createCommentVNode("", true), $options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator') ? (openBlock(), createElementBlock("li", mergeProps({
      key: 1,
      id: $options.getItemId(processedItem),
      "class": [_ctx.cx('separator'), $options.getItemProp(processedItem, 'class')],
      style: $options.getItemProp(processedItem, 'style'),
      role: "separator"
    }, _ctx.ptm('separator')), null, 16, _hoisted_6)) : createCommentVNode("", true)], 64);
  }), 128))], 16, _hoisted_1$1);
}

script$1.render = render$1;

var script = {
  name: 'MegaMenu',
  "extends": script$2,
  emits: ['focus', 'blur'],
  props: {
    model: {
      type: Array,
      "default": null
    },
    orientation: {
      type: String,
      "default": 'horizontal'
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
  outsideClickListener: null,
  resizeListener: null,
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
        key: '',
        parentKey: ''
      },
      activeItem: null,
      dirty: false
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
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
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
    hide: function hide(event, isFocus) {
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
      var _this = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          var isOutsideContainer = _this.container && !_this.container.contains(event.target);
          var isOutsideTarget = _this.popup ? !(_this.target && (_this.target === event.target || _this.target.contains(event.target))) : true;
          if (isOutsideContainer && isOutsideTarget) {
            _this.hide();
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
      var _this2 = this;
      if (!this.resizeListener) {
        this.resizeListener = function (event) {
          if (!DomHandler.isTouchDevice()) {
            _this2.hide(event, true);
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
      return ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
    },
    findFirstItemIndex: function findFirstItemIndex() {
      var _this3 = this;
      return this.visibleItems.findIndex(function (processedItem) {
        return _this3.isValidItem(processedItem);
      });
    },
    findLastItemIndex: function findLastItemIndex() {
      var _this4 = this;
      return ObjectUtils.findLastIndex(this.visibleItems, function (processedItem) {
        return _this4.isValidItem(processedItem);
      });
    },
    findNextItemIndex: function findNextItemIndex(index) {
      var _this5 = this;
      var matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex(function (processedItem) {
        return _this5.isValidItem(processedItem);
      }) : -1;
      return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    },
    findPrevItemIndex: function findPrevItemIndex(index) {
      var _this6 = this;
      var matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), function (processedItem) {
        return _this6.isValidItem(processedItem);
      }) : -1;
      return matchedItemIndex > -1 ? matchedItemIndex : index;
    },
    findSelectedItemIndex: function findSelectedItemIndex() {
      var _this7 = this;
      return this.visibleItems.findIndex(function (processedItem) {
        return _this7.isValidSelectedItem(processedItem);
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
      var _this8 = this;
      this.searchValue = (this.searchValue || '') + _char;
      var itemIndex = -1;
      var matched = false;
      if (this.focusedItemInfo.index !== -1) {
        itemIndex = this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function (processedItem) {
          return _this8.isItemMatched(processedItem);
        });
        itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo.index).findIndex(function (processedItem) {
          return _this8.isItemMatched(processedItem);
        }) : itemIndex + this.focusedItemInfo.index;
      } else {
        itemIndex = this.visibleItems.findIndex(function (processedItem) {
          return _this8.isItemMatched(processedItem);
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
        _this8.searchValue = '';
        _this8.searchTimeout = null;
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
      var _this9 = this;
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
          return _this9.createProcessedItems(_items, level + 1, newItem, key, _index);
        }) : _this9.createProcessedItems(item.items, level + 1, newItem, key);
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
    MegaMenuSub: script$1
  }
};

var _hoisted_1 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_MegaMenuSub = resolveComponent("MegaMenuSub");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: $options.containerRef,
    id: $data.id,
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "megamenu"
  }), [_ctx.$slots.start ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('start')
  }, _ctx.ptm('start')), [renderSlot(_ctx.$slots, "start")], 16)) : createCommentVNode("", true), createVNode(_component_MegaMenuSub, {
    ref: $options.menubarRef,
    id: $data.id + '_list',
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
  }, null, 8, ["id", "tabindex", "aria-label", "aria-labelledby", "aria-disabled", "aria-orientation", "aria-activedescendant", "menuId", "focusedItemId", "items", "horizontal", "templates", "activeItem", "exact", "pt", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter"]), _ctx.$slots.end ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx('end')
  }, _ctx.ptm('end')), [renderSlot(_ctx.$slots, "end")], 16)) : createCommentVNode("", true)], 16, _hoisted_1);
}

script.render = render;

export { script as default };
