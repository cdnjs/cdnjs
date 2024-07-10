'use strict';

var ChevronDownIcon = require('primevue/icons/chevrondown');
var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var Ripple = require('primevue/ripple');
var Tree = require('primevue/tree');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var TreeSelectStyle = require('primevue/treeselect/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var Tree__default = /*#__PURE__*/_interopDefaultLegacy(Tree);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TreeSelectStyle__default = /*#__PURE__*/_interopDefaultLegacy(TreeSelectStyle);

var script$1 = {
  name: 'BaseTreeSelect',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: null,
    options: Array,
    scrollHeight: {
      type: String,
      "default": '400px'
    },
    placeholder: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
    },
    selectionMode: {
      type: String,
      "default": 'single'
    },
    appendTo: {
      type: [String, Object],
      "default": 'body'
    },
    emptyMessage: {
      type: String,
      "default": null
    },
    display: {
      type: String,
      "default": 'comma'
    },
    metaKeySelection: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    panelProps: {
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
  style: TreeSelectStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : String(i); }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'TreeSelect',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'before-show', 'before-hide', 'change', 'show', 'hide', 'node-select', 'node-unselect', 'node-expand', 'node-collapse', 'focus', 'blur'],
  data: function data() {
    return {
      id: this.$attrs.id,
      focused: false,
      overlayVisible: false,
      expandedKeys: {}
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    modelValue: {
      handler: function handler() {
        if (!this.selfChange) {
          this.updateTreeState();
        }
        this.selfChange = false;
      },
      immediate: true
    },
    options: function options() {
      this.updateTreeState();
    }
  },
  outsideClickListener: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  selfChange: false,
  selfClick: false,
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      utils.ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
    this.updateTreeState();
  },
  methods: {
    show: function show() {
      this.$emit('before-show');
      this.overlayVisible = true;
    },
    hide: function hide() {
      this.$emit('before-hide');
      this.overlayVisible = false;
      this.$refs.focusInput.focus();
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    onClick: function onClick(event) {
      if (this.disabled) {
        return;
      }
      if (!this.disabled && (!this.overlay || !this.overlay.contains(event.target))) {
        if (this.overlayVisible) this.hide();else this.show();
        utils.DomHandler.focus(this.$refs.focusInput);
      }
    },
    onSelectionChange: function onSelectionChange(keys) {
      this.selfChange = true;
      this.$emit('update:modelValue', keys);
      this.$emit('change', keys);
    },
    onNodeSelect: function onNodeSelect(node) {
      this.$emit('node-select', node);
      if (this.selectionMode === 'single') {
        this.hide();
      }
    },
    onNodeUnselect: function onNodeUnselect(node) {
      this.$emit('node-unselect', node);
    },
    onNodeToggle: function onNodeToggle(keys) {
      this.expandedKeys = keys;
    },
    onFirstHiddenFocus: function onFirstHiddenFocus(event) {
      var focusableEl = event.relatedTarget === this.$refs.focusInput ? utils.DomHandler.getFirstFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      utils.DomHandler.focus(focusableEl);
    },
    onLastHiddenFocus: function onLastHiddenFocus(event) {
      var focusableEl = event.relatedTarget === this.$refs.focusInput ? utils.DomHandler.getLastFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      utils.DomHandler.focus(focusableEl);
    },
    onKeyDown: function onKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          this.onArrowDownKey(event);
          break;
        case 'Space':
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
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var _this = this;
      if (this.overlayVisible) return;
      this.show();
      this.$nextTick(function () {
        var treeNodeEl = utils.DomHandler.find(_this.$refs.tree.$el, '[data-pc-section="treeitem"]');
        var focusedElement = _toConsumableArray(treeNodeEl).find(function (item) {
          return item.getAttribute('tabindex') === '0';
        });
        utils.DomHandler.focus(focusedElement);
      });
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      if (this.overlayVisible) {
        this.hide();
      } else {
        this.onArrowDownKey(event);
      }
      event.preventDefault();
    },
    onEscapeKey: function onEscapeKey(event) {
      if (this.overlayVisible) {
        this.hide();
        event.preventDefault();
      }
    },
    onTabKey: function onTabKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!pressedInInputText) {
        if (this.overlayVisible && this.hasFocusableElements()) {
          utils.DomHandler.focus(this.$refs.firstHiddenFocusableElementOnOverlay);
          event.preventDefault();
        }
      }
    },
    hasFocusableElements: function hasFocusableElements() {
      return utils.DomHandler.getFocusableElements(this.overlay, ':not([data-p-hidden-focusable="true"])').length > 0;
    },
    onOverlayEnter: function onOverlayEnter(el) {
      utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
      utils.DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      this.alignOverlay();
      this.focus();
    },
    onOverlayAfterEnter: function onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.scrollValueInView();
      this.$emit('show');
    },
    onOverlayLeave: function onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit('hide');
      this.overlay = null;
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      utils.ZIndexUtils.clear(el);
    },
    focus: function focus() {
      var focusableElements = utils.DomHandler.getFocusableElements(this.overlay);
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    },
    alignOverlay: function alignOverlay() {
      if (this.appendTo === 'self') {
        utils.DomHandler.relativePosition(this.overlay, this.$el);
      } else {
        this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$el) + 'px';
        utils.DomHandler.absolutePosition(this.overlay, this.$el);
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this2 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this2.overlayVisible && !_this2.selfClick && _this2.isOutsideClicked(event)) {
            _this2.hide();
          }
          _this2.selfClick = false;
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
        this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, function () {
          if (_this3.overlayVisible) {
            _this3.hide();
          }
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
        this.resizeListener = function () {
          if (_this4.overlayVisible && !utils.DomHandler.isTouchDevice()) {
            _this4.hide();
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
    isOutsideClicked: function isOutsideClicked(event) {
      return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target) || this.overlay && this.overlay.contains(event.target));
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus__default["default"].emit('overlay-click', {
        originalEvent: event,
        target: this.$el
      });
      this.selfClick = true;
    },
    onOverlayKeydown: function onOverlayKeydown(event) {
      if (event.code === 'Escape') this.hide();
    },
    findSelectedNodes: function findSelectedNodes(node, keys, selectedNodes) {
      if (node) {
        if (this.isSelected(node, keys)) {
          selectedNodes.push(node);
          delete keys[node.key];
        }
        if (Object.keys(keys).length && node.children) {
          var _iterator = _createForOfIteratorHelper(node.children),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var childNode = _step.value;
              this.findSelectedNodes(childNode, keys, selectedNodes);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      } else {
        var _iterator2 = _createForOfIteratorHelper(this.options),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _childNode = _step2.value;
            this.findSelectedNodes(_childNode, keys, selectedNodes);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    },
    isSelected: function isSelected(node, keys) {
      return this.selectionMode === 'checkbox' ? keys[node.key] && keys[node.key].checked : keys[node.key];
    },
    updateTreeState: function updateTreeState() {
      var keys = _objectSpread$1({}, this.modelValue);
      this.expandedKeys = {};
      if (keys && this.options) {
        this.updateTreeBranchState(null, null, keys);
      }
    },
    updateTreeBranchState: function updateTreeBranchState(node, path, keys) {
      if (node) {
        if (this.isSelected(node, keys)) {
          this.expandPath(path);
          delete keys[node.key];
        }
        if (Object.keys(keys).length && node.children) {
          var _iterator3 = _createForOfIteratorHelper(node.children),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var childNode = _step3.value;
              path.push(node.key);
              this.updateTreeBranchState(childNode, path, keys);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } else {
        var _iterator4 = _createForOfIteratorHelper(this.options),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _childNode2 = _step4.value;
            this.updateTreeBranchState(_childNode2, [], keys);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    },
    expandPath: function expandPath(path) {
      if (path.length > 0) {
        var _iterator5 = _createForOfIteratorHelper(path),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var key = _step5.value;
            this.expandedKeys[key] = true;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    },
    scrollValueInView: function scrollValueInView() {
      if (this.overlay) {
        var selectedItem = utils.DomHandler.findSingle(this.overlay, '[data-p-highlight="true"]');
        if (selectedItem) {
          selectedItem.scrollIntoView({
            block: 'nearest',
            inline: 'start'
          });
        }
      }
    }
  },
  computed: {
    selectedNodes: function selectedNodes() {
      var selectedNodes = [];
      if (this.modelValue && this.options) {
        var keys = _objectSpread$1({}, this.modelValue);
        this.findSelectedNodes(null, keys, selectedNodes);
      }
      return selectedNodes;
    },
    label: function label() {
      var value = this.selectedNodes;
      return value.length ? value.map(function (node) {
        return node.label;
      }).join(', ') : this.placeholder;
    },
    emptyMessageText: function emptyMessageText() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage;
    },
    emptyValue: function emptyValue() {
      return !this.modelValue || Object.keys(this.modelValue).length === 0;
    },
    emptyOptions: function emptyOptions() {
      return !this.options || this.options.length === 0;
    },
    listId: function listId() {
      return this.id + '_list';
    }
  },
  components: {
    TSTree: Tree__default["default"],
    Portal: Portal__default["default"],
    ChevronDownIcon: ChevronDownIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["id", "disabled", "tabindex", "aria-labelledby", "aria-label", "aria-expanded", "aria-controls"];
var _hoisted_2 = ["aria-expanded"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TSTree = vue.resolveComponent("TSTree");
  var _component_Portal = vue.resolveComponent("Portal");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('root'),
    style: _ctx.sx('root'),
    onClick: _cache[9] || (_cache[9] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    })
  }, _ctx.ptmi('root')), [vue.createElementVNode("div", vue.mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [vue.createElementVNode("input", vue.mergeProps({
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    role: "combobox",
    "class": _ctx.inputClass,
    style: _ctx.inputStyle,
    readonly: "",
    disabled: _ctx.disabled,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-haspopup": "tree",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $options.listId,
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[1] || (_cache[1] = function ($event) {
      return $options.onBlur($event);
    }),
    onKeydown: _cache[2] || (_cache[2] = function ($event) {
      return $options.onKeyDown($event);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('hiddenInput'))), null, 16, _hoisted_1)], 16), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('labelContainer')
  }, _ctx.ptm('labelContainer')), [vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('label')
  }, _ctx.ptm('label')), [vue.renderSlot(_ctx.$slots, "value", {
    value: $options.selectedNodes,
    placeholder: _ctx.placeholder
  }, function () {
    return [_ctx.display === 'comma' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 0
    }, [vue.createTextVNode(vue.toDisplayString($options.label || 'empty'), 1)], 64)) : _ctx.display === 'chip' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 1
    }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.selectedNodes, function (node) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: node.key,
        "class": _ctx.cx('token')
      }, _ctx.ptm('token')), [vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('tokenLabel')
      }, _ctx.ptm('tokenLabel')), vue.toDisplayString(node.label), 17)], 16);
    }), 128)), $options.emptyValue ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 0
    }, [vue.createTextVNode(vue.toDisplayString(_ctx.placeholder || 'empty'), 1)], 64)) : vue.createCommentVNode("", true)], 64)) : vue.createCommentVNode("", true)];
  })], 16)], 16), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('trigger'),
    role: "button",
    "aria-haspopup": "tree",
    "aria-expanded": $data.overlayVisible
  }, _ctx.ptm('trigger')), [vue.renderSlot(_ctx.$slots, "triggericon", {
    "class": vue.normalizeClass(_ctx.cx('triggerIcon'))
  }, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent('ChevronDownIcon'), vue.mergeProps({
      "class": _ctx.cx('triggerIcon')
    }, _ctx.ptm('triggerIcon')), null, 16, ["class"]))];
  })], 16, _hoisted_2), vue.createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(vue.Transition, vue.mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onAfterEnter: $options.onOverlayAfterEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, _ctx.ptm('transition')), {
        "default": vue.withCtx(function () {
          return [$data.overlayVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.overlayRef,
            onClick: _cache[7] || (_cache[7] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            "class": [_ctx.cx('panel'), _ctx.panelClass],
            onKeydown: _cache[8] || (_cache[8] = function () {
              return $options.onOverlayKeydown && $options.onOverlayKeydown.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [vue.createElementVNode("span", vue.mergeProps({
            ref: "firstHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            "class": "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: _cache[3] || (_cache[3] = function () {
              return $options.onFirstHiddenFocus && $options.onFirstHiddenFocus.apply($options, arguments);
            })
          }, _ctx.ptm('hiddenFirstFocusableEl'), {
            "data-p-hidden-accessible": true,
            "data-p-hidden-focusable": true
          }), null, 16), vue.renderSlot(_ctx.$slots, "header", {
            value: _ctx.modelValue,
            options: _ctx.options
          }), vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('wrapper'),
            style: {
              'max-height': _ctx.scrollHeight
            }
          }, _ctx.ptm('wrapper')), [vue.createVNode(_component_TSTree, {
            ref: "tree",
            id: $options.listId,
            value: _ctx.options,
            selectionMode: _ctx.selectionMode,
            "onUpdate:selectionKeys": $options.onSelectionChange,
            selectionKeys: _ctx.modelValue,
            expandedKeys: $data.expandedKeys,
            "onUpdate:expandedKeys": $options.onNodeToggle,
            metaKeySelection: _ctx.metaKeySelection,
            onNodeExpand: _cache[4] || (_cache[4] = function ($event) {
              return _ctx.$emit('node-expand', $event);
            }),
            onNodeCollapse: _cache[5] || (_cache[5] = function ($event) {
              return _ctx.$emit('node-collapse', $event);
            }),
            onNodeSelect: $options.onNodeSelect,
            onNodeUnselect: $options.onNodeUnselect,
            level: 0,
            unstyled: _ctx.unstyled,
            pt: _ctx.ptm('tree')
          }, vue.createSlots({
            _: 2
          }, [_ctx.$slots.itemtogglericon ? {
            name: "togglericon",
            fn: vue.withCtx(function (iconProps) {
              return [vue.renderSlot(_ctx.$slots, "itemtogglericon", {
                node: iconProps.node,
                expanded: iconProps.expanded,
                "class": vue.normalizeClass(iconProps["class"])
              })];
            }),
            key: "0"
          } : undefined, _ctx.$slots.itemcheckboxicon ? {
            name: "checkboxicon",
            fn: vue.withCtx(function (iconProps) {
              return [vue.renderSlot(_ctx.$slots, "itemcheckboxicon", {
                checked: iconProps.checked,
                partialChecked: iconProps.partialChecked,
                "class": vue.normalizeClass(iconProps["class"])
              })];
            }),
            key: "1"
          } : undefined]), 1032, ["id", "value", "selectionMode", "onUpdate:selectionKeys", "selectionKeys", "expandedKeys", "onUpdate:expandedKeys", "metaKeySelection", "onNodeSelect", "onNodeUnselect", "unstyled", "pt"]), $options.emptyOptions ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('emptyMessage')
          }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "empty", {}, function () {
            return [vue.createTextVNode(vue.toDisplayString($options.emptyMessageText), 1)];
          })], 16)) : vue.createCommentVNode("", true)], 16), vue.renderSlot(_ctx.$slots, "footer", {
            value: _ctx.modelValue,
            options: _ctx.options
          }), vue.createElementVNode("span", vue.mergeProps({
            ref: "lastHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            "class": "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: _cache[6] || (_cache[6] = function () {
              return $options.onLastHiddenFocus && $options.onLastHiddenFocus.apply($options, arguments);
            })
          }, _ctx.ptm('hiddenLastFocusableEl'), {
            "data-p-hidden-accessible": true,
            "data-p-hidden-focusable": true
          }), null, 16)], 16)) : vue.createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}

script.render = render;

module.exports = script;
