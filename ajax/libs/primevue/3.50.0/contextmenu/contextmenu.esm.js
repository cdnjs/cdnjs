import Portal from 'primevue/portal';
import { ObjectUtils, DomHandler, UniqueComponentId, ZIndexUtils } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import ContextMenuStyle from 'primevue/contextmenu/style';
import AngleRightIcon from 'primevue/icons/angleright';
import Ripple from 'primevue/ripple';
import { mergeProps, resolveComponent, resolveDirective, openBlock, createBlock, Transition, withCtx, createElementBlock, Fragment, renderList, createElementVNode, withDirectives, resolveDynamicComponent, normalizeClass, createCommentVNode, toDisplayString, createVNode } from 'vue';

var script$2 = {
  name: 'BaseContextMenu',
  "extends": BaseComponent,
  props: {
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
    global: {
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
  style: ContextMenuStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$1 = {
  name: 'ContextMenuSub',
  hostName: 'ContextMenu',
  "extends": BaseComponent,
  emits: ['item-click', 'item-mouseenter', 'item-mousemove'],
  props: {
    items: {
      type: Array,
      "default": null
    },
    menuId: {
      type: String,
      "default": null
    },
    focusedItemId: {
      type: String,
      "default": null
    },
    root: {
      type: Boolean,
      "default": false
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
      return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    },
    getItemLabel: function getItemLabel(processedItem) {
      return this.getItemProp(processedItem, 'label');
    },
    getItemLabelId: function getItemLabelId(processedItem) {
      return "".concat(this.menuId, "_").concat(processedItem.key, "_label");
    },
    getPTOptions: function getPTOptions(key, processedItem, index) {
      return this.ptm(key, {
        context: {
          item: processedItem,
          active: this.isItemActive(processedItem),
          focused: this.isItemFocused(processedItem),
          disabled: this.isItemDisabled(processedItem),
          index: index
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
    onItemMouseMove: function onItemMouseMove(event, processedItem) {
      this.$emit('item-mousemove', {
        originalEvent: event,
        processedItem: processedItem,
        isFocus: true
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
    onEnter: function onEnter() {
      DomHandler.nestedPosition(this.$refs.container, this.level);
    },
    getMenuItemProps: function getMenuItemProps(processedItem, index) {
      return {
        action: mergeProps({
          "class": this.cx('action'),
          tabindex: -1,
          'aria-hidden': true
        }, this.getPTOptions('action', processedItem, index)),
        icon: mergeProps({
          "class": [this.cx('icon'), this.getItemProp(processedItem, 'icon')]
        }, this.getPTOptions('icon', processedItem, index)),
        label: mergeProps({
          "class": this.cx('label')
        }, this.getPTOptions('label', processedItem, index)),
        submenuicon: mergeProps({
          "class": this.cx('submenuIcon')
        }, this.getPTOptions('submenuicon', processedItem, index))
      };
    }
  },
  components: {
    AngleRightIcon: AngleRightIcon
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1 = ["tabindex"];
var _hoisted_2 = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-level", "aria-setsize", "aria-posinset", "data-p-highlight", "data-p-focused", "data-p-disabled"];
var _hoisted_3 = ["onClick", "onMouseenter", "onMousemove"];
var _hoisted_4 = ["href", "target"];
var _hoisted_5 = ["id"];
var _hoisted_6 = ["id"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_AngleRightIcon = resolveComponent("AngleRightIcon");
  var _component_ContextMenuSub = resolveComponent("ContextMenuSub", true);
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createBlock(Transition, mergeProps({
    name: "p-contextmenusub",
    onEnter: $options.onEnter
  }, _ctx.ptm('menu.transition')), {
    "default": withCtx(function () {
      return [($props.root ? true : $props.visible) ? (openBlock(), createElementBlock("ul", mergeProps({
        key: 0,
        ref: "container",
        tabindex: $props.tabindex
      }, _ctx.ptm('menu')), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.items, function (processedItem, index) {
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
        }, $options.getPTOptions('menuitem', processedItem, index), {
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
          },
          onMousemove: function onMousemove($event) {
            return $options.onItemMouseMove($event, processedItem);
          }
        }, $options.getPTOptions('content', processedItem, index)), [!$props.templates.item ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
          key: 0,
          href: $options.getItemProp(processedItem, 'url'),
          "class": _ctx.cx('action'),
          target: $options.getItemProp(processedItem, 'target'),
          tabindex: "-1",
          "aria-hidden": "true"
        }, $options.getPTOptions('action', processedItem, index)), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
          key: 0,
          item: processedItem.item,
          "class": normalizeClass(_ctx.cx('icon'))
        }, null, 8, ["item", "class"])) : $options.getItemProp(processedItem, 'icon') ? (openBlock(), createElementBlock("span", mergeProps({
          key: 1,
          "class": [_ctx.cx('icon'), $options.getItemProp(processedItem, 'icon')]
        }, $options.getPTOptions('icon', processedItem, index)), null, 16)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
          id: $options.getItemLabelId(processedItem),
          "class": _ctx.cx('label')
        }, $options.getPTOptions('label', processedItem, index)), toDisplayString($options.getItemLabel(processedItem)), 17, _hoisted_5), $options.getItemProp(processedItem, 'items') ? (openBlock(), createElementBlock(Fragment, {
          key: 2
        }, [$props.templates.submenuicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.submenuicon), {
          key: 0,
          active: $options.isItemActive(processedItem),
          "class": normalizeClass(_ctx.cx('submenuIcon'))
        }, null, 8, ["active", "class"])) : (openBlock(), createBlock(_component_AngleRightIcon, mergeProps({
          key: 1,
          "class": _ctx.cx('submenuIcon')
        }, $options.getPTOptions('submenuicon', processedItem, index)), null, 16, ["class"]))], 64)) : createCommentVNode("", true)], 16, _hoisted_4)), [[_directive_ripple]]) : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
          key: 1,
          item: processedItem.item,
          hasSubmenu: $options.getItemProp(processedItem, 'items'),
          label: $options.getItemLabel(processedItem),
          props: $options.getMenuItemProps(processedItem, index)
        }, null, 8, ["item", "hasSubmenu", "label", "props"]))], 16, _hoisted_3), $options.isItemVisible(processedItem) && $options.isItemGroup(processedItem) ? (openBlock(), createBlock(_component_ContextMenuSub, mergeProps({
          key: 0,
          id: $options.getItemId(processedItem) + '_list',
          role: "menu",
          "class": _ctx.cx('submenu'),
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
          }),
          "aria-labelledby": $options.getItemLabelId(processedItem)
        }, _ctx.ptm('submenu')), null, 16, ["id", "class", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "level", "visible", "pt", "unstyled", "aria-labelledby"])) : createCommentVNode("", true)], 16, _hoisted_2)) : createCommentVNode("", true), $options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator') ? (openBlock(), createElementBlock("li", mergeProps({
          key: 1,
          id: $options.getItemId(processedItem),
          style: $options.getItemProp(processedItem, 'style'),
          "class": [_ctx.cx('separator'), $options.getItemProp(processedItem, 'class')],
          role: "separator"
        }, _ctx.ptm('separator')), null, 16, _hoisted_6)) : createCommentVNode("", true)], 64);
      }), 128))], 16, _hoisted_1)) : createCommentVNode("", true)];
    }),
    _: 1
  }, 16, ["onEnter"]);
}

script$1.render = render$1;

var script = {
  name: 'ContextMenu',
  "extends": script$2,
  inheritAttrs: false,
  emits: ['focus', 'blur', 'show', 'hide'],
  target: null,
  outsideClickListener: null,
  resizeListener: null,
  documentContextMenuListener: null,
  pageX: null,
  pageY: null,
  container: null,
  list: null,
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
      visible: false,
      submenuVisible: false
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    activeItemPath: function activeItemPath(newPath) {
      if (ObjectUtils.isNotEmpty(newPath)) {
        this.bindOutsideClickListener();
        this.bindResizeListener();
      } else if (!this.visible) {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
      }
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    if (this.global) {
      this.bindDocumentContextMenuListener();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindResizeListener();
    this.unbindOutsideClickListener();
    this.unbindDocumentContextMenuListener();
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
      this.visible ? this.hide() : this.show(event);
    },
    show: function show(event) {
      this.activeItemPath = [];
      this.focusedItemInfo = {
        index: -1,
        level: 0,
        parentKey: ''
      };
      DomHandler.focus(this.list);
      this.pageX = event.pageX;
      this.pageY = event.pageY;
      this.visible ? this.position() : this.visible = true;
      event.stopPropagation();
      event.preventDefault();
    },
    hide: function hide() {
      this.visible = false;
      this.activeItemPath = [];
      this.focusedItemInfo = {
        index: -1,
        level: 0,
        parentKey: ''
      };
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.focusedItemInfo = this.focusedItemInfo.index !== -1 ? this.focusedItemInfo : {
        index: -1,
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
      isFocus && DomHandler.focus(this.list);
    },
    onItemClick: function onItemClick(event) {
      var processedItem = event.processedItem;
      var grouped = this.isProccessedItemGroup(processedItem);
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
        DomHandler.focus(this.list);
      } else {
        grouped ? this.onItemChange(event) : this.hide();
      }
    },
    onItemMouseEnter: function onItemMouseEnter(event) {
      this.onItemChange(event);
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
        this.popup && this.hide();
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
        var element = DomHandler.findSingle(this.list, "li[id=\"".concat("".concat(this.focusedItemIdx), "\"]"));
        var anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
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
      this.hide();
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
      DomHandler.addStyles(el, {
        position: 'absolute'
      });
      this.position();
      if (this.autoZIndex) {
        ZIndexUtils.set('menu', el, this.baseZIndex + this.$primevue.config.zIndex.menu);
      }
    },
    onAfterEnter: function onAfterEnter() {
      this.bindOutsideClickListener();
      this.bindResizeListener();
      this.$emit('show');
      DomHandler.focus(this.list);
    },
    onLeave: function onLeave() {
      this.$emit('hide');
      this.container = null;
    },
    onAfterLeave: function onAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndexUtils.clear(el);
      }
      this.unbindOutsideClickListener();
      this.unbindResizeListener();
    },
    position: function position() {
      var left = this.pageX + 1;
      var top = this.pageY + 1;
      var width = this.container.offsetParent ? this.container.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.container);
      var height = this.container.offsetParent ? this.container.offsetHeight : DomHandler.getHiddenElementOuterHeight(this.container);
      var viewport = DomHandler.getViewport();

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
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this2 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          var isOutsideContainer = _this2.container && !_this2.container.contains(event.target);
          var isOutsideTarget = _this2.visible ? !(_this2.target && (_this2.target === event.target || _this2.target.contains(event.target))) : true;
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
    bindResizeListener: function bindResizeListener() {
      var _this3 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this3.visible && !DomHandler.isTouchDevice()) {
            _this3.hide();
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
    bindDocumentContextMenuListener: function bindDocumentContextMenuListener() {
      var _this4 = this;
      if (!this.documentContextMenuListener) {
        this.documentContextMenuListener = function (event) {
          event.button === 2 && _this4.show(event);
        };
        document.addEventListener('contextmenu', this.documentContextMenuListener);
      }
    },
    unbindDocumentContextMenuListener: function unbindDocumentContextMenuListener() {
      if (this.documentContextMenuListener) {
        document.removeEventListener('contextmenu', this.documentContextMenuListener);
        this.documentContextMenuListener = null;
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
      var id = index !== -1 ? "".concat(this.id, "_").concat(index) : this.focusedItemIdx;
      var element = DomHandler.findSingle(this.list, "li[id=\"".concat(id, "\"]"));
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
    listRef: function listRef(el) {
      this.list = el ? el.$el : undefined;
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
    focusedItemIdx: function focusedItemIdx() {
      return this.focusedItemInfo.index !== -1 ? "".concat(this.id).concat(ObjectUtils.isNotEmpty(this.focusedItemInfo.parentKey) ? '_' + this.focusedItemInfo.parentKey : '', "_").concat(this.focusedItemInfo.index) : null;
    }
  },
  components: {
    ContextMenuSub: script$1,
    Portal: Portal
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ContextMenuSub = resolveComponent("ContextMenuSub");
  var _component_Portal = resolveComponent("Portal");
  return openBlock(), createBlock(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function () {
      return [createVNode(Transition, mergeProps({
        name: "p-contextmenu",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, _ctx.ptm('transition')), {
        "default": withCtx(function () {
          return [$data.visible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            "class": _ctx.cx('root')
          }, _ctx.ptmi('root')), [createVNode(_component_ContextMenuSub, {
            ref: $options.listRef,
            id: $data.id + '_list',
            "class": normalizeClass(_ctx.cx('menu')),
            role: "menubar",
            root: true,
            tabindex: _ctx.tabindex,
            "aria-orientation": "vertical",
            "aria-activedescendant": $data.focused ? $options.focusedItemIdx : undefined,
            menuId: $data.id,
            focusedItemId: $data.focused ? $options.focusedItemIdx : undefined,
            items: $options.processedItems,
            templates: _ctx.$slots,
            activeItemPath: $data.activeItemPath,
            "aria-labelledby": _ctx.ariaLabelledby,
            "aria-label": _ctx.ariaLabel,
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
          }, null, 8, ["id", "class", "tabindex", "aria-activedescendant", "menuId", "focusedItemId", "items", "templates", "activeItemPath", "aria-labelledby", "aria-label", "visible", "pt", "unstyled", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter", "onItemMousemove"])], 16)) : createCommentVNode("", true)];
        }),
        _: 1
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 1
  }, 8, ["appendTo"]);
}

script.render = render;

export { script as default };
