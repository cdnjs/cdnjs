'use strict';

require('primevue/button');
var AngleDoubleDownIcon = require('primevue/icons/angledoubledown');
var AngleDoubleLeftIcon = require('primevue/icons/angledoubleleft');
var AngleDoubleRightIcon = require('primevue/icons/angledoubleright');
var AngleDoubleUpIcon = require('primevue/icons/angledoubleup');
var AngleDownIcon = require('primevue/icons/angledown');
var AngleLeftIcon = require('primevue/icons/angleleft');
var AngleRightIcon = require('primevue/icons/angleright');
var AngleUpIcon = require('primevue/icons/angleup');
var Listbox = require('primevue/listbox');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var PickListStyle = require('primevue/picklist/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var AngleDoubleDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleDownIcon);
var AngleDoubleLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleLeftIcon);
var AngleDoubleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleRightIcon);
var AngleDoubleUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleUpIcon);
var AngleDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDownIcon);
var AngleLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleLeftIcon);
var AngleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleRightIcon);
var AngleUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleUpIcon);
var Listbox__default = /*#__PURE__*/_interopDefaultLegacy(Listbox);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var PickListStyle__default = /*#__PURE__*/_interopDefaultLegacy(PickListStyle);

var script$1 = {
  name: 'BasePickList',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: {
      type: Array,
      "default": function _default() {
        return [[], []];
      }
    },
    selection: {
      type: Array,
      "default": function _default() {
        return [[], []];
      }
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
    showSourceControls: {
      type: Boolean,
      "default": true
    },
    showTargetControls: {
      type: Boolean,
      "default": true
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
    moveToTargetProps: {
      type: null,
      "default": null
    },
    moveAllToTargetProps: {
      type: null,
      "default": null
    },
    moveToSourceProps: {
      type: null,
      "default": null
    },
    moveAllToSourceProps: {
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
    }
  },
  style: PickListStyle__default["default"],
  provide: function provide() {
    return {
      $pcPickList: this,
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
  name: 'PickList',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'reorder', 'update:selection', 'selection-change', 'move-to-target', 'move-to-source', 'move-all-to-target', 'move-all-to-source', 'focus', 'blur'],
  itemTouched: false,
  reorderDirection: null,
  styleElement: null,
  media: null,
  mediaChangeListener: null,
  data: function data() {
    return {
      id: this.$attrs.id,
      d_selection: this.selection,
      viewChanged: false
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    selection: function selection(newValue) {
      this.d_selection = newValue;
    },
    breakpoint: function breakpoint() {
      this.destroyMedia();
      this.initMedia();
    }
  },
  updated: function updated() {
    if (this.reorderDirection) {
      this.updateListScroll(this.$refs.sourceList.$el);
      this.updateListScroll(this.$refs.targetList.$el);
      this.reorderDirection = null;
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.destroyStyle();
    this.destroyMedia();
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
    if (this.responsive) {
      this.createStyle();
      this.initMedia();
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
    onChangeSelection: function onChangeSelection(params, listIndex) {
      this.d_selection[listIndex] = params.value;
      this.updateSelection(params.event);
    },
    onListFocus: function onListFocus(event, listType) {
      this.$emit('focus', event, listType);
    },
    onListBlur: function onListBlur(event, listType) {
      this.$emit('blur', event, listType);
    },
    onReorderUpdate: function onReorderUpdate(event, value, listIndex) {
      this.$emit('update:modelValue', value);
      this.$emit('reorder', {
        originalEvent: event,
        value: value,
        direction: this.reorderDirection,
        listIndex: listIndex
      });
    },
    onItemDblClick: function onItemDblClick(event, listIndex) {
      if (listIndex === 0) this.moveToTarget({
        event: event.originalEvent
      });else if (listIndex === 1) this.moveToSource({
        event: event.originalEvent
      });
    },
    moveUp: function moveUp(event, listIndex) {
      if (this.d_selection && this.d_selection[listIndex]) {
        var valueList = _toConsumableArray(this.modelValue[listIndex]);
        var selectionList = this.d_selection[listIndex];
        for (var i = 0; i < selectionList.length; i++) {
          var selectedItem = selectionList[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, valueList);
          if (selectedItemIndex !== 0) {
            var movedItem = valueList[selectedItemIndex];
            var temp = valueList[selectedItemIndex - 1];
            valueList[selectedItemIndex - 1] = movedItem;
            valueList[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        var value = _toConsumableArray(this.modelValue);
        value[listIndex] = valueList;
        this.reorderDirection = 'up';
        this.onReorderUpdate(event, value, listIndex);
      }
    },
    moveTop: function moveTop(event, listIndex) {
      if (this.d_selection) {
        var valueList = _toConsumableArray(this.modelValue[listIndex]);
        var selectionList = this.d_selection[listIndex];
        for (var i = 0; i < selectionList.length; i++) {
          var selectedItem = selectionList[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, valueList);
          if (selectedItemIndex !== 0) {
            var movedItem = valueList.splice(selectedItemIndex, 1)[0];
            valueList.unshift(movedItem);
          } else {
            break;
          }
        }
        var value = _toConsumableArray(this.modelValue);
        value[listIndex] = valueList;
        this.reorderDirection = 'top';
        this.onReorderUpdate(event, value, listIndex);
      }
    },
    moveDown: function moveDown(event, listIndex) {
      if (this.d_selection) {
        var valueList = _toConsumableArray(this.modelValue[listIndex]);
        var selectionList = this.d_selection[listIndex];
        for (var i = selectionList.length - 1; i >= 0; i--) {
          var selectedItem = selectionList[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, valueList);
          if (selectedItemIndex !== valueList.length - 1) {
            var movedItem = valueList[selectedItemIndex];
            var temp = valueList[selectedItemIndex + 1];
            valueList[selectedItemIndex + 1] = movedItem;
            valueList[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        var value = _toConsumableArray(this.modelValue);
        value[listIndex] = valueList;
        this.reorderDirection = 'down';
        this.onReorderUpdate(event, value, listIndex);
      }
    },
    moveBottom: function moveBottom(event, listIndex) {
      if (this.d_selection) {
        var valueList = _toConsumableArray(this.modelValue[listIndex]);
        var selectionList = this.d_selection[listIndex];
        for (var i = selectionList.length - 1; i >= 0; i--) {
          var selectedItem = selectionList[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, valueList);
          if (selectedItemIndex !== valueList.length - 1) {
            var movedItem = valueList.splice(selectedItemIndex, 1)[0];
            valueList.push(movedItem);
          } else {
            break;
          }
        }
        var value = _toConsumableArray(this.modelValue);
        value[listIndex] = valueList;
        this.reorderDirection = 'bottom';
        this.onReorderUpdate(event, value, listIndex);
      }
    },
    moveToTarget: function moveToTarget(event) {
      var selection = this.d_selection && this.d_selection[0] ? this.d_selection[0] : null;
      var sourceList = _toConsumableArray(this.modelValue[0]);
      var targetList = _toConsumableArray(this.modelValue[1]);
      if (selection) {
        for (var i = 0; i < selection.length; i++) {
          var selectedItem = selection[i];
          if (utils.ObjectUtils.findIndexInList(selectedItem, targetList) == -1) {
            targetList.push(sourceList.splice(utils.ObjectUtils.findIndexInList(selectedItem, sourceList), 1)[0]);
          }
        }
        var value = _toConsumableArray(this.modelValue);
        value[0] = sourceList;
        value[1] = targetList;
        this.$emit('update:modelValue', value);
        this.$emit('move-to-target', {
          originalEvent: event,
          items: _toConsumableArray(new Set(selection))
        });
        this.d_selection[0] = [];
        this.updateSelection(event);
      }
    },
    moveAllToTarget: function moveAllToTarget(event) {
      if (this.modelValue[0]) {
        var sourceList = _toConsumableArray(this.modelValue[0]);
        var targetList = _toConsumableArray(this.modelValue[1]);
        this.$emit('move-all-to-target', {
          originalEvent: event,
          items: sourceList
        });
        targetList = [].concat(_toConsumableArray(targetList), _toConsumableArray(sourceList));
        sourceList = [];
        var value = _toConsumableArray(this.modelValue);
        value[0] = sourceList;
        value[1] = targetList;
        this.$emit('update:modelValue', value);
        this.d_selection = [[], []];
        this.updateSelection(event);
      }
    },
    moveToSource: function moveToSource(event) {
      var selection = this.d_selection && this.d_selection[1] ? this.d_selection[1] : null;
      var sourceList = _toConsumableArray(this.modelValue[0]);
      var targetList = _toConsumableArray(this.modelValue[1]);
      if (selection) {
        for (var i = 0; i < selection.length; i++) {
          var selectedItem = selection[i];
          if (utils.ObjectUtils.findIndexInList(selectedItem, sourceList) == -1) {
            sourceList.push(targetList.splice(utils.ObjectUtils.findIndexInList(selectedItem, targetList), 1)[0]);
          }
        }
        var value = _toConsumableArray(this.modelValue);
        value[0] = sourceList;
        value[1] = targetList;
        this.$emit('update:modelValue', value);
        this.$emit('move-to-source', {
          originalEvent: event,
          items: _toConsumableArray(new Set(selection))
        });
        this.d_selection[1] = [];
        this.updateSelection(event);
      }
    },
    moveAllToSource: function moveAllToSource(event) {
      if (this.modelValue[1]) {
        var sourceList = _toConsumableArray(this.modelValue[0]);
        var targetList = _toConsumableArray(this.modelValue[1]);
        this.$emit('move-all-to-source', {
          originalEvent: event,
          items: targetList
        });
        sourceList = [].concat(_toConsumableArray(sourceList), _toConsumableArray(targetList));
        targetList = [];
        var value = _toConsumableArray(this.modelValue);
        value[0] = sourceList;
        value[1] = targetList;
        this.$emit('update:modelValue', value);
        this.d_selection = [[], []];
        this.updateSelection(event);
      }
    },
    onItemClick: function onItemClick(event, item, index, listIndex) {
      var listType = listIndex === 0 ? 'sourceList' : 'targetList';
      this.itemTouched = false;
      var selectionList = this.d_selection[listIndex];
      var selectedIndex = utils.ObjectUtils.findIndexInList(item, selectionList);
      var selected = selectedIndex != -1;
      var metaSelection = this.itemTouched ? false : this.metaKeySelection;
      var selectedId = utils.DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]')[index].getAttribute('id');
      this.focusedOptionIndex = selectedId;
      var _selection;
      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;
        if (selected && metaKey) {
          _selection = selectionList.filter(function (val, index) {
            return index !== selectedIndex;
          });
        } else {
          _selection = metaKey ? selectionList ? _toConsumableArray(selectionList) : [] : [];
          _selection.push(item);
        }
      } else {
        if (selected) {
          _selection = selectionList.filter(function (val, index) {
            return index !== selectedIndex;
          });
        } else {
          _selection = selectionList ? _toConsumableArray(selectionList) : [];
          _selection.push(item);
        }
      }
      var newSelection = _toConsumableArray(this.d_selection);
      newSelection[listIndex] = _selection;
      this.d_selection = newSelection;
      this.updateSelection(event);
    },
    updateListScroll: function updateListScroll(listElement) {
      var listItems = utils.DomHandler.find(listElement, '[data-pc-section="item"][data-p-highlight="true"]');
      if (listItems && listItems.length) {
        switch (this.reorderDirection) {
          case 'up':
            utils.DomHandler.scrollInView(listElement, listItems[0]);
            break;
          case 'top':
            listElement.scrollTop = 0;
            break;
          case 'down':
            utils.DomHandler.scrollInView(listElement, listItems[listItems.length - 1]);
            break;
          case 'bottom':
            listElement.scrollTop = listElement.scrollHeight;
            break;
        }
      }
    },
    initMedia: function initMedia() {
      this.media = window.matchMedia("(max-width: ".concat(this.breakpoint, ")"));
      this.viewChanged = this.media.matches;
      this.bindMediaChangeListener();
    },
    destroyMedia: function destroyMedia() {
      this.unbindMediaChangeListener();
    },
    bindMediaChangeListener: function bindMediaChangeListener() {
      var _this = this;
      if (this.media && !this.mediaChangeListener) {
        this.mediaChangeListener = function (event) {
          _this.viewChanged = event.matches;
        };
        this.media.addEventListener('change', this.mediaChangeListener);
      }
    },
    unbindMediaChangeListener: function unbindMediaChangeListener() {
      if (this.media && this.mediaChangeListener) {
        this.media.removeEventListener('change', this.mediaChangeListener);
        this.mediaChangeListener = null;
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
        var innerHTML = "\n@media screen and (max-width: ".concat(this.breakpoint, ") {\n    .p-picklist[").concat(this.attributeSelector, "] {\n        flex-direction: column;\n    }\n\n    .p-picklist[").concat(this.attributeSelector, "] .p-picklist-controls {\n        flex-direction: row;\n    }\n}\n");
        this.styleElement.innerHTML = innerHTML;
      }
    },
    destroyStyle: function destroyStyle() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    },
    moveDisabled: function moveDisabled(index) {
      return this.disabled ? true : this.d_selection && (!this.d_selection[index] || !this.d_selection[index].length) ? true : false;
    },
    moveAllDisabled: function moveAllDisabled(list) {
      return this.disabled ? true : utils.ObjectUtils.isEmpty(this[list]);
    }
  },
  computed: {
    idSource: function idSource() {
      return "".concat(this.id, "_source");
    },
    idTarget: function idTarget() {
      return "".concat(this.id, "_target");
    },
    sourceList: function sourceList() {
      return this.modelValue && this.modelValue[0] ? this.modelValue[0] : null;
    },
    targetList: function targetList() {
      return this.modelValue && this.modelValue[1] ? this.modelValue[1] : null;
    },
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
    moveToTargetAriaLabel: function moveToTargetAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveToTarget : undefined;
    },
    moveAllToTargetAriaLabel: function moveAllToTargetAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveAllToTarget : undefined;
    },
    moveToSourceAriaLabel: function moveToSourceAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveToSource : undefined;
    },
    moveAllToSourceAriaLabel: function moveAllToSourceAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveAllToSource : undefined;
    }
  },
  components: {
    Listbox: Listbox__default["default"],
    AngleRightIcon: AngleRightIcon__default["default"],
    AngleLeftIcon: AngleLeftIcon__default["default"],
    AngleDownIcon: AngleDownIcon__default["default"],
    AngleUpIcon: AngleUpIcon__default["default"],
    AngleDoubleRightIcon: AngleDoubleRightIcon__default["default"],
    AngleDoubleLeftIcon: AngleDoubleLeftIcon__default["default"],
    AngleDoubleDownIcon: AngleDoubleDownIcon__default["default"],
    AngleDoubleUpIcon: AngleDoubleUpIcon__default["default"]
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
  }, _ctx.ptmi('root')), [_ctx.showSourceControls ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('sourceControls')
  }, _ctx.ptm('sourceControls'), {
    "data-pc-group-section": "controls"
  }), [vue.renderSlot(_ctx.$slots, "sourcecontrolsstart"), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled(0),
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.moveUp($event, 0);
    })
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveUpButtonProps), {
    pt: _ctx.ptm('sourceMoveUpButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "moveupicon", {}, function () {
        return [vue.createVNode(_component_AngleUpIcon, vue.mergeProps(_ctx.ptm('sourceMoveUpButton')['icon'], {
          "data-pc-section": "moveupicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled(0),
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.moveTop($event, 0);
    })
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveTopButtonProps), {
    pt: _ctx.ptm('sourceMoveTopButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movetopicon", {}, function () {
        return [vue.createVNode(_component_AngleDoubleUpIcon, vue.mergeProps(_ctx.ptm('sourceMoveTopButton')['icon'], {
          "data-pc-section": "movetopicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled(0),
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.moveDown($event, 0);
    })
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveDownButtonProps), {
    pt: _ctx.ptm('sourceMoveDownButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movedownicon", {}, function () {
        return [vue.createVNode(_component_AngleDownIcon, vue.mergeProps(_ctx.ptm('sourceMoveDownButton')['icon'], {
          "data-pc-section": "movedownicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled(0),
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.moveBottom($event, 0);
    })
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveBottomButtonProps), {
    pt: _ctx.ptm('sourceMoveBottomButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movebottomicon", {}, function () {
        return [vue.createVNode(_component_AngleDoubleDownIcon, vue.mergeProps(_ctx.ptm('sourceMoveBottomButton')['icon'], {
          "data-pc-section": "movebottomicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), vue.renderSlot(_ctx.$slots, "sourcecontrolsend")], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('sourceListContainer')
  }, _ctx.ptm('sourceListContainer'), {
    "data-pc-group-section": "listcontainer"
  }), [vue.createVNode(_component_Listbox, {
    ref: "sourceList",
    id: $options.idSource + '_list',
    modelValue: $data.d_selection[0],
    options: $options.sourceList,
    multiple: "",
    metaKeySelection: _ctx.metaKeySelection,
    listStyle: _ctx.listStyle,
    scrollHeight: _ctx.scrollHeight,
    tabindex: $options.sourceList && $options.sourceList.length > 0 ? _ctx.tabindex : -1,
    dataKey: _ctx.dataKey,
    autoOptionFocus: _ctx.autoOptionFocus,
    focusOnHover: _ctx.focusOnHover,
    stripedRows: _ctx.stripedRows,
    disabled: _ctx.disabled,
    pt: _ctx.ptm('list'),
    unstyled: _ctx.unstyled,
    onFocus: _cache[4] || (_cache[4] = function ($event) {
      return $options.onListFocus($event, 'sourceList');
    }),
    onBlur: _cache[5] || (_cache[5] = function ($event) {
      return $options.onListBlur($event, 'sourceList');
    }),
    onChange: _cache[6] || (_cache[6] = function ($event) {
      return $options.onChangeSelection($event, 0);
    }),
    onItemDblclick: _cache[7] || (_cache[7] = function ($event) {
      return $options.onItemDblClick($event, 0);
    }),
    "data-pc-group-section": "list"
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
  }, [_ctx.$slots.sourceheader ? {
    name: "header",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "sourceheader")];
    }),
    key: "0"
  } : undefined]), 1032, ["id", "modelValue", "options", "metaKeySelection", "listStyle", "scrollHeight", "tabindex", "dataKey", "autoOptionFocus", "focusOnHover", "stripedRows", "disabled", "pt", "unstyled"])], 16), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('transferControls')
  }, _ctx.ptm('transferControls'), {
    "data-pc-group-section": "controls"
  }), [vue.renderSlot(_ctx.$slots, "movecontrolsstart"), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveToTargetAriaLabel,
    onClick: $options.moveToTarget,
    disabled: $options.moveDisabled(0)
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveToTargetProps), {
    pt: _ctx.ptm('moveToTargetButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movetotargeticon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.viewChanged ? 'AngleDownIcon' : 'AngleRightIcon'), vue.mergeProps(_ctx.ptm('moveToTargetButton')['icon'], {
          "data-pc-section": "movetotargeticon"
        }), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveAllToTargetAriaLabel,
    onClick: $options.moveAllToTarget,
    disabled: $options.moveAllDisabled('sourceList')
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveAllToTargetProps), {
    pt: _ctx.ptm('moveAllToTargetButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movealltotargeticon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.viewChanged ? 'AngleDoubleDownIcon' : 'AngleDoubleRightIcon'), vue.mergeProps(_ctx.ptm('moveAllToTargetButton')['icon'], {
          "data-pc-section": "movealltotargeticon"
        }), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveToSourceAriaLabel,
    onClick: $options.moveToSource,
    disabled: $options.moveDisabled(1)
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveToSourceProps), {
    pt: _ctx.ptm('moveToSourceButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movetosourceicon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.viewChanged ? 'AngleUpIcon' : 'AngleLeftIcon'), vue.mergeProps(_ctx.ptm('moveToSourceButton')['icon'], {
          "data-pc-section": "movetosourceicon"
        }), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveAllToSourceAriaLabel,
    onClick: $options.moveAllToSource,
    disabled: $options.moveAllDisabled('targetList')
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveAllToSourceProps), {
    pt: _ctx.ptm('moveAllToSourceButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movealltosourceicon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.viewChanged ? 'AngleDoubleUpIcon' : 'AngleDoubleLeftIcon'), vue.mergeProps(_ctx.ptm('moveAllToSourceButton')['icon'], {
          "data-pc-section": "movealltosourceicon"
        }), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), vue.renderSlot(_ctx.$slots, "movecontrolsend")], 16), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('targetListContainer')
  }, _ctx.ptm('targetListContainer'), {
    "data-pc-group-section": "listcontainer"
  }), [vue.createVNode(_component_Listbox, {
    ref: "targetList",
    id: $options.idTarget + '_list',
    modelValue: $data.d_selection[1],
    options: $options.targetList,
    multiple: "",
    metaKeySelection: _ctx.metaKeySelection,
    listStyle: _ctx.listStyle,
    scrollHeight: _ctx.scrollHeight,
    tabindex: $options.targetList && $options.targetList.length > 0 ? _ctx.tabindex : -1,
    dataKey: _ctx.dataKey,
    autoOptionFocus: _ctx.autoOptionFocus,
    focusOnHover: _ctx.focusOnHover,
    stripedRows: _ctx.stripedRows,
    disabled: _ctx.disabled,
    pt: _ctx.ptm('list'),
    unstyled: _ctx.unstyled,
    onFocus: _cache[8] || (_cache[8] = function ($event) {
      return $options.onListFocus($event, 'targetList');
    }),
    onBlur: _cache[9] || (_cache[9] = function ($event) {
      return $options.onListBlur($event, 'targetList');
    }),
    onChange: _cache[10] || (_cache[10] = function ($event) {
      return $options.onChangeSelection($event, 1);
    }),
    onItemDblclick: _cache[11] || (_cache[11] = function ($event) {
      return $options.onItemDblClick($event, 1);
    }),
    "data-pc-group-section": "list"
  }, vue.createSlots({
    option: vue.withCtx(function (_ref2) {
      var option = _ref2.option,
        index = _ref2.index;
      return [vue.renderSlot(_ctx.$slots, "item", {
        item: option,
        index: index
      })];
    }),
    _: 2
  }, [_ctx.$slots.targetheader ? {
    name: "header",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "targetheader")];
    }),
    key: "0"
  } : undefined]), 1032, ["id", "modelValue", "options", "metaKeySelection", "listStyle", "scrollHeight", "tabindex", "dataKey", "autoOptionFocus", "focusOnHover", "stripedRows", "disabled", "pt", "unstyled"])], 16), _ctx.showTargetControls ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('targetControls')
  }, _ctx.ptm('targetControls'), {
    "data-pc-group-section": "controls"
  }), [vue.renderSlot(_ctx.$slots, "targetcontrolsstart"), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled(1),
    onClick: _cache[12] || (_cache[12] = function ($event) {
      return $options.moveUp($event, 1);
    })
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveUpButtonProps), {
    pt: _ctx.ptm('targetMoveUpButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "moveupicon", {}, function () {
        return [vue.createVNode(_component_AngleUpIcon, vue.mergeProps(_ctx.ptm('targetMoveUpButton')['icon'], {
          "data-pc-section": "moveupicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled(1),
    onClick: _cache[13] || (_cache[13] = function ($event) {
      return $options.moveTop($event, 1);
    })
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveTopButtonProps), {
    pt: _ctx.ptm('targetMoveTopButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movetopicon", {}, function () {
        return [vue.createVNode(_component_AngleDoubleUpIcon, vue.mergeProps(_ctx.ptm('targetMoveTopButton')['icon'], {
          "data-pc-section": "movetopicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled(1),
    onClick: _cache[14] || (_cache[14] = function ($event) {
      return $options.moveDown($event, 1);
    })
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveDownButtonProps), {
    pt: _ctx.ptm('targetMoveDownButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movedownicon", {}, function () {
        return [vue.createVNode(_component_AngleDownIcon, vue.mergeProps(_ctx.ptm('targetMoveDownButton')['icon'], {
          "data-pc-section": "movedownicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), vue.createVNode(_component_Button, vue.mergeProps({
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled(1),
    onClick: _cache[15] || (_cache[15] = function ($event) {
      return $options.moveBottom($event, 1);
    })
  }, _objectSpread(_objectSpread({}, _ctx.buttonProps), _ctx.moveBottomButtonProps), {
    pt: _ctx.ptm('targetMoveBottomButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "movebottomicon", {}, function () {
        return [vue.createVNode(_component_AngleDoubleDownIcon, vue.mergeProps(_ctx.ptm('targetMoveBottomButton')['icon'], {
          "data-pc-section": "movebottomicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), vue.renderSlot(_ctx.$slots, "targetcontrolsend")], 16)) : vue.createCommentVNode("", true)], 16);
}

script.render = render;

module.exports = script;
