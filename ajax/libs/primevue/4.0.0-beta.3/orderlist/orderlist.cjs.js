'use strict';

var Button = require('primevue/button');
var AngleDoubleDownIcon = require('primevue/icons/angledoubledown');
var AngleDoubleUpIcon = require('primevue/icons/angledoubleup');
var AngleDownIcon = require('primevue/icons/angledown');
var AngleUpIcon = require('primevue/icons/angleup');
var Listbox = require('primevue/listbox');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var OrderListStyle = require('primevue/orderlist/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var AngleDoubleDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleDownIcon);
var AngleDoubleUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleUpIcon);
var AngleDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDownIcon);
var AngleUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleUpIcon);
var Listbox__default = /*#__PURE__*/_interopDefaultLegacy(Listbox);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var OrderListStyle__default = /*#__PURE__*/_interopDefaultLegacy(OrderListStyle);

var script$1 = {
  name: 'BaseOrderList',
  "extends": BaseComponent__default["default"],
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
    scrollHeight: {
      type: String,
      "default": '14rem'
    },
    buttonProps: {
      type: Object,
      "default": function _default() {
        return {
          severity: 'secondary'
        };
      }
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
    tabindex: {
      type: Number,
      "default": 0
    },
    disabled: {
      type: Boolean,
      "default": false
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
  style: OrderListStyle__default["default"],
  provide: function provide() {
    return {
      $pcOrderList: this,
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
      d_selection: this.selection
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
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
    this.id = this.id || utils.UniqueComponentId();
    if (this.responsive) {
      this.createStyle();
    }
  },
  methods: {
    updateSelection: function updateSelection(event) {
      this.$emit('update:selection', this.d_selection);
      this.$emit('selection-change', {
        originalEvent: event,
        value: this.d_selection
      });
    },
    onChangeSelection: function onChangeSelection(params) {
      this.d_selection = params.value;
      this.updateSelection(params.event);
    },
    onListFocus: function onListFocus(event) {
      this.$emit('focus', event);
    },
    onListBlur: function onListBlur(event) {
      this.$emit('blur', event);
    },
    onReorderUpdate: function onReorderUpdate(event, value) {
      this.$emit('update:modelValue', value);
      this.$emit('reorder', {
        originalEvent: event,
        value: value,
        direction: this.reorderDirection
      });
    },
    moveUp: function moveUp(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = 0; i < this.d_selection.length; i++) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value);
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
        this.onReorderUpdate(event, value);
      }
    },
    moveTop: function moveTop(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = 0; i < this.d_selection.length; i++) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== 0) {
            var movedItem = value.splice(selectedItemIndex, 1)[0];
            value.unshift(movedItem);
          } else {
            break;
          }
        }
        this.reorderDirection = 'top';
        this.onReorderUpdate(event, value);
      }
    },
    moveDown: function moveDown(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = this.d_selection.length - 1; i >= 0; i--) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value);
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
        this.onReorderUpdate(event, value);
      }
    },
    moveBottom: function moveBottom(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = this.d_selection.length - 1; i >= 0; i--) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== value.length - 1) {
            var movedItem = value.splice(selectedItemIndex, 1)[0];
            value.push(movedItem);
          } else {
            break;
          }
        }
        this.reorderDirection = 'bottom';
        this.onReorderUpdate(event, value);
      }
    },
    updateListScroll: function updateListScroll() {
      this.list = utils.DomHandler.findSingle(this.$refs.listbox.$el, '[data-pc-section="list"]');
      var listItems = utils.DomHandler.find(this.list, '[data-pc-section="item"][data-p-highlight="true"]');
      if (listItems && listItems.length) {
        switch (this.reorderDirection) {
          case 'up':
            utils.DomHandler.scrollInView(this.list, listItems[0]);
            break;
          case 'top':
            this.list.scrollTop = 0;
            break;
          case 'down':
            utils.DomHandler.scrollInView(this.list, listItems[listItems.length - 1]);
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
        utils.DomHandler.setAttribute(this.styleElement, 'nonce', (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
        document.head.appendChild(this.styleElement);
        var innerHTML = "\n@media screen and (max-width: ".concat(this.breakpoint, ") {\n    .p-orderlist[").concat(this.attributeSelector, "] {\n        flex-direction: column;\n    }\n\n    .p-orderlist[").concat(this.attributeSelector, "] .p-orderlist-controls {\n        flex-direction: row;\n    }\n}\n");
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
      return this.disabled ? true : !this.d_selection || !this.d_selection.length ? true : false;
    }
  },
  computed: {
    attributeSelector: function attributeSelector() {
      return utils.UniqueComponentId();
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
      return utils.ObjectUtils.isNotEmpty(this.d_selection);
    }
  },
  components: {
    Listbox: Listbox__default["default"],
    Button: Button__default["default"],
    AngleUpIcon: AngleUpIcon__default["default"],
    AngleDownIcon: AngleDownIcon__default["default"],
    AngleDoubleUpIcon: AngleDoubleUpIcon__default["default"],
    AngleDoubleDownIcon: AngleDoubleDownIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_AngleUpIcon = vue.resolveComponent("AngleUpIcon");
  var _component_Button = vue.resolveComponent("Button");
  var _component_AngleDoubleUpIcon = vue.resolveComponent("AngleDoubleUpIcon");
  var _component_AngleDownIcon = vue.resolveComponent("AngleDownIcon");
  var _component_AngleDoubleDownIcon = vue.resolveComponent("AngleDoubleDownIcon");
  var _component_Listbox = vue.resolveComponent("Listbox");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('controls')
  }, _ctx.ptm('controls')), [vue.renderSlot(_ctx.$slots, "controlsstart"), vue.createVNode(_component_Button, vue.mergeProps({
    onClick: $options.moveUp,
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled()
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveUpButtonProps), {
    pt: _ctx.ptm('pcMoveUpButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "moveupicon", {}, function () {
        return [vue.createVNode(_component_AngleUpIcon, vue.mergeProps(_ctx.ptm('pcMoveUpButton')['icon'], {
          "data-pc-section": "moveupicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    onClick: $options.moveTop,
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled()
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveTopButtonProps), {
    pt: _ctx.ptm('pcMoveTopButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movetopicon", {}, function () {
        return [vue.createVNode(_component_AngleDoubleUpIcon, vue.mergeProps(_ctx.ptm('pcMoveTopButton')['icon'], {
          "data-pc-section": "movetopicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    onClick: $options.moveDown,
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled()
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveDownButtonProps), {
    pt: _ctx.ptm('pcMoveDownButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movedownicon", {}, function () {
        return [vue.createVNode(_component_AngleDownIcon, vue.mergeProps(_ctx.ptm('pcMoveDownButton')['icon'], {
          "data-pc-section": "movedownicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    onClick: $options.moveBottom,
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled()
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveBottomButtonProps), {
    pt: _ctx.ptm('pcMoveBottomButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movebottomicon", {}, function () {
        return [vue.createVNode(_component_AngleDoubleDownIcon, vue.mergeProps(_ctx.ptm('pcMoveBottomButton')['icon'], {
          "data-pc-section": "movebottomicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), vue.renderSlot(_ctx.$slots, "controlsend")], 16), vue.createVNode(_component_Listbox, {
    ref: "listbox",
    id: $data.id,
    modelValue: $data.d_selection,
    options: _ctx.modelValue,
    multiple: "",
    metaKeySelection: _ctx.metaKeySelection,
    listStyle: _ctx.listStyle,
    scrollHeight: _ctx.scrollHeight,
    tabindex: _ctx.tabindex,
    dataKey: _ctx.dataKey,
    autoOptionFocus: _ctx.autoOptionFocus,
    focusOnHover: _ctx.focusOnHover,
    stripedRows: _ctx.stripedRows,
    disabled: _ctx.disabled,
    ariaLabel: _ctx.ariaLabel,
    ariaLabelledby: _ctx.ariaLabelledby,
    pt: _ctx.ptm('pcList'),
    unstyled: _ctx.unstyled,
    onFocus: $options.onListFocus,
    onBlur: $options.onListBlur,
    onChange: $options.onChangeSelection
  }, vue.createSlots({
    option: vue.withCtx(function (_ref) {
      var option = _ref.option,
        index = _ref.index;
      return [vue.renderSlot(_ctx.$slots, "item", {
        item: option,
        index: index
      })];
    }),
    _: 2
  }, [_ctx.$slots.header ? {
    name: "header",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "header")];
    }),
    key: "0"
  } : undefined]), 1032, ["id", "modelValue", "options", "metaKeySelection", "listStyle", "scrollHeight", "tabindex", "dataKey", "autoOptionFocus", "focusOnHover", "stripedRows", "disabled", "ariaLabel", "ariaLabelledby", "pt", "unstyled", "onFocus", "onBlur", "onChange"])], 16);
}

script.render = render;

module.exports = script;
