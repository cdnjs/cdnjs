import Button from 'primevue/button';
import AngleDoubleDownIcon from 'primevue/icons/angledoubledown';
import AngleDoubleUpIcon from 'primevue/icons/angledoubleup';
import AngleDownIcon from 'primevue/icons/angledown';
import AngleUpIcon from 'primevue/icons/angleup';
import Ripple from 'primevue/ripple';
import { UniqueComponentId, ObjectUtils, DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import OrderListStyle from 'primevue/orderlist/style';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, createVNode, withCtx, createCommentVNode, TransitionGroup, Fragment, renderList, withDirectives } from 'vue';

var script$1 = {
  name: 'BaseOrderList',
  "extends": BaseComponent,
  props: {
    modelValue: {
      type: Array,
      "default": null
    },
    selection: {
      type: Array,
      "default": null
    },
    dataKey: {
      type: String,
      "default": null
    },
    listStyle: {
      type: null,
      "default": null
    },
    metaKeySelection: {
      type: Boolean,
      "default": false
    },
    autoOptionFocus: {
      type: Boolean,
      "default": true
    },
    focusOnHover: {
      type: Boolean,
      "default": true
    },
    responsive: {
      type: Boolean,
      "default": true
    },
    breakpoint: {
      type: String,
      "default": '960px'
    },
    stripedRows: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    listProps: {
      type: null,
      "default": null
    },
    moveUpButtonProps: {
      type: null,
      "default": null
    },
    moveTopButtonProps: {
      type: null,
      "default": null
    },
    moveDownButtonProps: {
      type: null,
      "default": null
    },
    moveBottomButtonProps: {
      type: null,
      "default": null
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
  style: OrderListStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'OrderList',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'reorder', 'update:selection', 'selection-change', 'focus', 'blur'],
  itemTouched: false,
  reorderDirection: null,
  styleElement: null,
  list: null,
  data: function data() {
    return {
      id: this.$attrs.id,
      d_selection: this.selection,
      focused: false,
      focusedOptionIndex: -1
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.destroyStyle();
  },
  updated: function updated() {
    if (this.reorderDirection) {
      this.updateListScroll();
      this.reorderDirection = null;
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    if (this.responsive) {
      this.createStyle();
    }
  },
  methods: {
    getItemKey: function getItemKey(item, index) {
      return this.dataKey ? ObjectUtils.resolveFieldData(item, this.dataKey) : index;
    },
    getPTOptions: function getPTOptions(item, key, index) {
      return this.ptm(key, {
        context: {
          active: this.isSelected(item),
          focused: "".concat(this.id, "_").concat(index) === this.focusedOptionId
        }
      });
    },
    isSelected: function isSelected(item) {
      return ObjectUtils.findIndexInList(item, this.d_selection) != -1;
    },
    onListFocus: function onListFocus(event) {
      this.focused = true;
      this.findCurrentFocusedIndex();
      this.scrollInView(this.focusedOptionIndex);
      this.$emit('focus', event);
    },
    onListBlur: function onListBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onListKeyDown: function onListKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          this.onArrowDownKey(event);
          break;
        case 'ArrowUp':
          this.onArrowUpKey(event);
          break;
        case 'Home':
          this.onHomeKey(event);
          break;
        case 'End':
          this.onEndKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
          this.onEnterKey(event);
          break;
        case 'Space':
          this.onSpaceKey(event);
          break;
        case 'KeyA':
          if (event.ctrlKey) {
            this.d_selection = _toConsumableArray(this.modelValue);
            this.$emit('update:selection', this.d_selection);
            event.preventDefault();
          }
      }
    },
    onOptionMouseDown: function onOptionMouseDown(event, index) {
      this.changeFocusedOptionIndex(index);
    },
    onOptionMouseMove: function onOptionMouseMove(index) {
      if (this.focusOnHover && this.focused) {
        this.changeFocusedOptionIndex(index);
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex() : this.findFirstSelectedOptionIndex();
      this.changeFocusedOptionIndex(optionIndex);
      if (event.shiftKey) {
        this.onEnterKey(event);
      }
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex() : this.findLastSelectedOptionIndex();
      this.changeFocusedOptionIndex(optionIndex);
      if (event.shiftKey) {
        this.onEnterKey(event);
      }
      event.preventDefault();
    },
    onHomeKey: function onHomeKey(event) {
      if (event.ctrlKey && event.shiftKey) {
        var matchedOptionIndex = this.findMatchedOptionIndex();
        this.d_selection = _toConsumableArray(this.modelValue).slice(0, matchedOptionIndex + 1);
        this.$emit('update:selection', this.d_selection);
        this.$emit('selection-change', {
          originalEvent: event,
          value: this.d_selection
        });
      } else {
        this.changeFocusedOptionIndex(0);
      }
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      if (event.ctrlKey && event.shiftKey) {
        var matchedOptionIndex = this.findMatchedOptionIndex();
        this.d_selection = _toConsumableArray(this.modelValue).slice(matchedOptionIndex, items.length);
        this.$emit('update:selection', this.d_selection);
        this.$emit('selection-change', {
          originalEvent: event,
          value: this.d_selection
        });
      } else {
        this.changeFocusedOptionIndex(this.findAllItems().length - 1);
      }
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      var matchedOptionIndex = this.findMatchedOptionIndex();
      this.onItemClick(event, this.modelValue[matchedOptionIndex], matchedOptionIndex);
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event) {
      event.preventDefault();
      if (event.shiftKey && this.d_selection && this.d_selection.length > 0) {
        var selectedItemIndex = ObjectUtils.findIndexInList(this.d_selection[0], _toConsumableArray(this.modelValue));
        var matchedOptionIndex = this.findMatchedOptionIndex();
        this.d_selection = _toConsumableArray(this.modelValue).slice(Math.min(selectedItemIndex, matchedOptionIndex), Math.max(selectedItemIndex, matchedOptionIndex) + 1);
        this.$emit('update:selection', this.d_selection);
        this.$emit('selection-change', {
          originalEvent: event,
          value: this.d_selection
        });
      } else {
        this.onEnterKey(event);
      }
    },
    findAllItems: function findAllItems() {
      return DomHandler.find(this.list, '[data-pc-section="item"]');
    },
    findFocusedItem: function findFocusedItem() {
      return DomHandler.findSingle(this.list, "[data-pc-section=\"item\"][id=".concat(this.focusedOptionIndex, "]"));
    },
    findCurrentFocusedIndex: function findCurrentFocusedIndex() {
      if (this.focusedOptionIndex === -1) {
        this.focusedOptionIndex = this.findFirstSelectedOptionIndex();
        if (this.autoOptionFocus && this.focusedOptionIndex === -1) {
          this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        }
      }
    },
    findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
      var firstFocusableItem = DomHandler.findSingle(this.list, '[data-pc-section="item"]');
      return DomHandler.getAttribute(firstFocusableItem, 'id');
    },
    findFirstSelectedOptionIndex: function findFirstSelectedOptionIndex() {
      if (this.hasSelectedOption) {
        var selectedFirstItem = DomHandler.findSingle(this.list, '[data-p-highlight="true"]');
        return DomHandler.getAttribute(selectedFirstItem, 'id');
      }
      return -1;
    },
    findLastSelectedOptionIndex: function findLastSelectedOptionIndex() {
      if (this.hasSelectedOption) {
        var selectedItems = DomHandler.find(this.list, '[data-p-highlight="true"]');
        return ObjectUtils.findIndexInList(selectedItems[selectedItems.length - 1], this.list.children);
      }
      return -1;
    },
    findMatchedOptionIndex: function findMatchedOptionIndex() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.focusedOptionIndex;
      var items = this.findAllItems();
      return _toConsumableArray(items).findIndex(function (link) {
        return link.id === id;
      });
    },
    findNextOptionIndex: function findNextOptionIndex() {
      var matchedOptionIndex = this.findMatchedOptionIndex();
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    },
    findPrevOptionIndex: function findPrevOptionIndex() {
      var matchedOptionIndex = this.findMatchedOptionIndex();
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index) {
      var items = this.findAllItems();
      var order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
      this.focusedOptionIndex = items[order] ? items[order].getAttribute('id') : -1;
      this.scrollInView(this.focusedOptionIndex);
    },
    scrollInView: function scrollInView(id) {
      var element = DomHandler.findSingle(this.list, "[data-pc-section=\"item\"][id=\"".concat(id, "\"]"));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: 'nearest',
          inline: 'start',
          behavior: 'smooth'
        });
      }
    },
    moveUp: function moveUp(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = 0; i < this.d_selection.length; i++) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== 0) {
            var movedItem = value[selectedItemIndex];
            var temp = value[selectedItemIndex - 1];
            value[selectedItemIndex - 1] = movedItem;
            value[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        this.reorderDirection = 'up';
        this.$emit('update:modelValue', value);
        this.$emit('reorder', {
          originalEvent: event,
          value: value,
          direction: this.reorderDirection
        });
      }
    },
    moveTop: function moveTop(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = 0; i < this.d_selection.length; i++) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== 0) {
            var movedItem = value.splice(selectedItemIndex, 1)[0];
            value.unshift(movedItem);
          } else {
            break;
          }
        }
        this.reorderDirection = 'top';
        this.$emit('update:modelValue', value);
        this.$emit('reorder', {
          originalEvent: event,
          value: value,
          direction: this.reorderDirection
        });
      }
    },
    moveDown: function moveDown(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = this.d_selection.length - 1; i >= 0; i--) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== value.length - 1) {
            var movedItem = value[selectedItemIndex];
            var temp = value[selectedItemIndex + 1];
            value[selectedItemIndex + 1] = movedItem;
            value[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        this.reorderDirection = 'down';
        this.$emit('update:modelValue', value);
        this.$emit('reorder', {
          originalEvent: event,
          value: value,
          direction: this.reorderDirection
        });
      }
    },
    moveBottom: function moveBottom(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = this.d_selection.length - 1; i >= 0; i--) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== value.length - 1) {
            var movedItem = value.splice(selectedItemIndex, 1)[0];
            value.push(movedItem);
          } else {
            break;
          }
        }
        this.reorderDirection = 'bottom';
        this.$emit('update:modelValue', value);
        this.$emit('reorder', {
          originalEvent: event,
          value: value,
          direction: this.reorderDirection
        });
      }
    },
    onItemClick: function onItemClick(event, item, index) {
      this.itemTouched = false;
      var selectedIndex = ObjectUtils.findIndexInList(item, this.d_selection);
      var selected = selectedIndex != -1;
      var metaSelection = this.itemTouched ? false : this.metaKeySelection;
      var selectedId = this.findAllItems()[index].getAttribute('id');
      this.focusedOptionIndex = selectedId;
      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;
        if (selected && metaKey) {
          this.d_selection = this.d_selection.filter(function (val, index) {
            return index !== selectedIndex;
          });
        } else {
          this.d_selection = metaKey ? this.d_selection ? _toConsumableArray(this.d_selection) : [] : [];
          ObjectUtils.insertIntoOrderedArray(item, index, this.d_selection, this.modelValue);
        }
      } else {
        if (selected) {
          this.d_selection = this.d_selection.filter(function (val, index) {
            return index !== selectedIndex;
          });
        } else {
          this.d_selection = this.d_selection ? _toConsumableArray(this.d_selection) : [];
          ObjectUtils.insertIntoOrderedArray(item, index, this.d_selection, this.modelValue);
        }
      }
      this.$emit('update:selection', this.d_selection);
      this.$emit('selection-change', {
        originalEvent: event,
        value: this.d_selection
      });
    },
    onItemTouchEnd: function onItemTouchEnd() {
      this.itemTouched = true;
    },
    updateListScroll: function updateListScroll() {
      var listItems = DomHandler.find(this.list, '[data-pc-section="item"][data-p-highlight="true"]');
      if (listItems && listItems.length) {
        switch (this.reorderDirection) {
          case 'up':
            DomHandler.scrollInView(this.list, listItems[0]);
            break;
          case 'top':
            this.list.scrollTop = 0;
            break;
          case 'down':
            DomHandler.scrollInView(this.list, listItems[listItems.length - 1]);
            break;
          case 'bottom':
            this.list.scrollTop = this.list.scrollHeight;
            break;
        }
      }
    },
    createStyle: function createStyle() {
      if (!this.styleElement && !this.isUnstyled) {
        var _this$$primevue;
        this.$el.setAttribute(this.attributeSelector, '');
        this.styleElement = document.createElement('style');
        this.styleElement.type = 'text/css';
        DomHandler.setAttribute(this.styleElement, 'nonce', (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
        document.head.appendChild(this.styleElement);
        var innerHTML = "\n@media screen and (max-width: ".concat(this.breakpoint, ") {\n    .p-orderlist[").concat(this.attributeSelector, "] {\n        flex-direction: column;\n    }\n\n    .p-orderlist[").concat(this.attributeSelector, "] .p-orderlist-controls {\n        padding: var(--content-padding);\n        flex-direction: row;\n    }\n\n    .p-orderlist[").concat(this.attributeSelector, "] .p-orderlist-controls .p-button {\n        margin-right: var(--inline-spacing);\n        margin-bottom: 0;\n    }\n\n    .p-orderlist[").concat(this.attributeSelector, "] .p-orderlist-controls .p-button:last-child {\n        margin-right: 0;\n    }\n}\n");
        this.styleElement.innerHTML = innerHTML;
      }
    },
    destroyStyle: function destroyStyle() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    },
    moveDisabled: function moveDisabled() {
      if (!this.d_selection || !this.d_selection.length) {
        return true;
      }
    },
    listRef: function listRef(el) {
      this.list = el ? el.$el : undefined;
    }
  },
  computed: {
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    },
    moveUpAriaLabel: function moveUpAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveUp : undefined;
    },
    moveTopAriaLabel: function moveTopAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveTop : undefined;
    },
    moveDownAriaLabel: function moveDownAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveDown : undefined;
    },
    moveBottomAriaLabel: function moveBottomAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveBottom : undefined;
    },
    hasSelectedOption: function hasSelectedOption() {
      return ObjectUtils.isNotEmpty(this.d_selection);
    }
  },
  components: {
    OLButton: Button,
    AngleUpIcon: AngleUpIcon,
    AngleDownIcon: AngleDownIcon,
    AngleDoubleUpIcon: AngleDoubleUpIcon,
    AngleDoubleDownIcon: AngleDoubleDownIcon
  },
  directives: {
    ripple: Ripple
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["id", "onClick", "onMousedown", "onMousemove", "aria-selected", "data-p-highlight", "data-p-focused"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_AngleUpIcon = resolveComponent("AngleUpIcon");
  var _component_OLButton = resolveComponent("OLButton");
  var _component_AngleDoubleUpIcon = resolveComponent("AngleDoubleUpIcon");
  var _component_AngleDownIcon = resolveComponent("AngleDownIcon");
  var _component_AngleDoubleDownIcon = resolveComponent("AngleDoubleDownIcon");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('controls')
  }, _ctx.ptm('controls')), [renderSlot(_ctx.$slots, "controlsstart"), createVNode(_component_OLButton, mergeProps({
    type: "button",
    onClick: $options.moveUp,
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled()
  }, _ctx.moveUpButtonProps, {
    pt: _ctx.ptm('moveUpButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "moveupicon", {}, function () {
        return [createVNode(_component_AngleUpIcon, mergeProps(_ctx.ptm('moveUpButton')['icon'], {
          "data-pc-section": "moveupicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_OLButton, mergeProps({
    type: "button",
    onClick: $options.moveTop,
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled()
  }, _ctx.moveTopButtonProps, {
    pt: _ctx.ptm('moveTopButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetopicon", {}, function () {
        return [createVNode(_component_AngleDoubleUpIcon, mergeProps(_ctx.ptm('moveTopButton')['icon'], {
          "data-pc-section": "movetopicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_OLButton, mergeProps({
    type: "button",
    onClick: $options.moveDown,
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled()
  }, _ctx.moveDownButtonProps, {
    pt: _ctx.ptm('moveDownButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movedownicon", {}, function () {
        return [createVNode(_component_AngleDownIcon, mergeProps(_ctx.ptm('moveDownButton')['icon'], {
          "data-pc-section": "movedownicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_OLButton, mergeProps({
    type: "button",
    onClick: $options.moveBottom,
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled()
  }, _ctx.moveBottomButtonProps, {
    pt: _ctx.ptm('moveBottomButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movebottomicon", {}, function () {
        return [createVNode(_component_AngleDoubleDownIcon, mergeProps(_ctx.ptm('moveBottomButton')['icon'], {
          "data-pc-section": "movebottomicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), renderSlot(_ctx.$slots, "controlsend")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('container')
  }, _ctx.ptm('container')), [_ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [renderSlot(_ctx.$slots, "header")], 16)) : createCommentVNode("", true), createVNode(TransitionGroup, mergeProps({
    ref: $options.listRef,
    id: $data.id + '_list',
    name: "p-orderlist-flip",
    tag: "ul",
    "class": _ctx.cx('list'),
    style: _ctx.listStyle,
    role: "listbox",
    "aria-multiselectable": "true",
    tabindex: _ctx.tabindex,
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    onFocus: $options.onListFocus,
    onBlur: $options.onListBlur,
    onKeydown: $options.onListKeyDown
  }, _objectSpread(_objectSpread(_objectSpread({}, _ctx.listProps), _ctx.ptm('list')), _ctx.ptm('transition'))), {
    "default": withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelValue, function (item, i) {
        return withDirectives((openBlock(), createElementBlock("li", mergeProps({
          key: $options.getItemKey(item, i),
          id: $data.id + '_' + i,
          role: "option",
          "class": _ctx.cx('item', {
            item: item,
            id: "".concat($data.id, "_").concat(i)
          }),
          onClick: function onClick($event) {
            return $options.onItemClick($event, item, i);
          },
          onTouchend: _cache[0] || (_cache[0] = function () {
            return $options.onItemTouchEnd && $options.onItemTouchEnd.apply($options, arguments);
          }),
          onMousedown: function onMousedown($event) {
            return $options.onOptionMouseDown($event, i);
          },
          onMousemove: function onMousemove($event) {
            return $options.onOptionMouseMove(i);
          },
          "aria-selected": $options.isSelected(item)
        }, $options.getPTOptions(item, 'item', i), {
          "data-p-highlight": $options.isSelected(item),
          "data-p-focused": "".concat($data.id, "_").concat(i) === $options.focusedOptionId
        }), [renderSlot(_ctx.$slots, "item", {
          item: item,
          index: i
        })], 16, _hoisted_1)), [[_directive_ripple]]);
      }), 128))];
    }),
    _: 3
  }, 16, ["id", "class", "style", "tabindex", "aria-activedescendant", "aria-label", "aria-labelledby", "onFocus", "onBlur", "onKeydown"])], 16)], 16);
}

script.render = render;

export { script as default };
