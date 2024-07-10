'use strict';

var SearchIcon = require('primevue/icons/search');
var SpinnerIcon = require('primevue/icons/spinner');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var TreeStyle = require('primevue/tree/style');
var Checkbox = require('primevue/checkbox');
var CheckIcon = require('primevue/icons/check');
var ChevronDownIcon = require('primevue/icons/chevrondown');
var ChevronRightIcon = require('primevue/icons/chevronright');
var MinusIcon = require('primevue/icons/minus');
var Ripple = require('primevue/ripple');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SearchIcon__default = /*#__PURE__*/_interopDefaultLegacy(SearchIcon);
var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TreeStyle__default = /*#__PURE__*/_interopDefaultLegacy(TreeStyle);
var Checkbox__default = /*#__PURE__*/_interopDefaultLegacy(Checkbox);
var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var MinusIcon__default = /*#__PURE__*/_interopDefaultLegacy(MinusIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script$2 = {
  name: 'BaseTree',
  "extends": BaseComponent__default["default"],
  props: {
    value: {
      type: null,
      "default": null
    },
    expandedKeys: {
      type: null,
      "default": null
    },
    selectionKeys: {
      type: null,
      "default": null
    },
    selectionMode: {
      type: String,
      "default": null
    },
    metaKeySelection: {
      type: Boolean,
      "default": false
    },
    loading: {
      type: Boolean,
      "default": false
    },
    loadingIcon: {
      type: String,
      "default": undefined
    },
    loadingMode: {
      type: String,
      "default": 'mask'
    },
    filter: {
      type: Boolean,
      "default": false
    },
    filterBy: {
      type: String,
      "default": 'label'
    },
    filterMode: {
      type: String,
      "default": 'lenient'
    },
    filterPlaceholder: {
      type: String,
      "default": null
    },
    filterLocale: {
      type: String,
      "default": undefined
    },
    highlightOnSelect: {
      type: Boolean,
      "default": false
    },
    scrollHeight: {
      type: String,
      "default": null
    },
    level: {
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
  style: TreeStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : String(i); }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script$1 = {
  name: 'TreeNode',
  hostName: 'Tree',
  "extends": BaseComponent__default["default"],
  emits: ['node-toggle', 'node-click', 'checkbox-change'],
  props: {
    node: {
      type: null,
      "default": null
    },
    expandedKeys: {
      type: null,
      "default": null
    },
    loadingMode: {
      type: String,
      "default": 'mask'
    },
    selectionKeys: {
      type: null,
      "default": null
    },
    selectionMode: {
      type: String,
      "default": null
    },
    templates: {
      type: null,
      "default": null
    },
    level: {
      type: Number,
      "default": null
    },
    index: null
  },
  nodeTouched: false,
  toggleClicked: false,
  mounted: function mounted() {
    this.setAllNodesTabIndexes();
  },
  methods: {
    toggle: function toggle() {
      this.$emit('node-toggle', this.node);
      this.toggleClicked = true;
    },
    label: function label(node) {
      return typeof node.label === 'function' ? node.label() : node.label;
    },
    onChildNodeToggle: function onChildNodeToggle(node) {
      this.$emit('node-toggle', node);
    },
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        context: {
          index: this.index,
          expanded: this.expanded,
          selected: this.selected,
          checked: this.checked,
          leaf: this.leaf
        }
      });
    },
    onClick: function onClick(event) {
      if (this.toggleClicked || utils.DomHandler.getAttribute(event.target, '[data-pc-section="toggler"]') || utils.DomHandler.getAttribute(event.target.parentElement, '[data-pc-section="toggler"]')) {
        this.toggleClicked = false;
        return;
      }
      if (this.isCheckboxSelectionMode()) {
        this.toggleCheckbox();
      } else {
        this.$emit('node-click', {
          originalEvent: event,
          nodeTouched: this.nodeTouched,
          node: this.node
        });
      }
      this.nodeTouched = false;
    },
    onChildNodeClick: function onChildNodeClick(event) {
      this.$emit('node-click', event);
    },
    onTouchEnd: function onTouchEnd() {
      this.nodeTouched = true;
    },
    onKeyDown: function onKeyDown(event) {
      if (!this.isSameNode(event)) return;
      switch (event.code) {
        case 'Tab':
          this.onTabKey(event);
          break;
        case 'ArrowDown':
          this.onArrowDown(event);
          break;
        case 'ArrowUp':
          this.onArrowUp(event);
          break;
        case 'ArrowRight':
          this.onArrowRight(event);
          break;
        case 'ArrowLeft':
          this.onArrowLeft(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          this.onEnterKey(event);
          break;
      }
    },
    onArrowDown: function onArrowDown(event) {
      var nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target;
      var listElement = nodeElement.children[1];
      if (listElement) {
        this.focusRowChange(nodeElement, listElement.children[0]);
      } else {
        if (nodeElement.nextElementSibling) {
          this.focusRowChange(nodeElement, nodeElement.nextElementSibling);
        } else {
          var nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);
          if (nextSiblingAncestor) {
            this.focusRowChange(nodeElement, nextSiblingAncestor);
          }
        }
      }
      event.preventDefault();
    },
    onArrowUp: function onArrowUp(event) {
      var nodeElement = event.target;
      if (nodeElement.previousElementSibling) {
        this.focusRowChange(nodeElement, nodeElement.previousElementSibling, this.findLastVisibleDescendant(nodeElement.previousElementSibling));
      } else {
        var parentNodeElement = this.getParentNodeElement(nodeElement);
        if (parentNodeElement) {
          this.focusRowChange(nodeElement, parentNodeElement);
        }
      }
      event.preventDefault();
    },
    onArrowRight: function onArrowRight(event) {
      var _this = this;
      if (this.leaf || this.expanded) return;
      event.currentTarget.tabIndex = -1;
      this.$emit('node-toggle', this.node);
      this.$nextTick(function () {
        _this.onArrowDown(event);
      });
    },
    onArrowLeft: function onArrowLeft(event) {
      var togglerElement = utils.DomHandler.findSingle(event.currentTarget, '[data-pc-section="toggler"]');
      if (this.level === 0 && !this.expanded) {
        return false;
      }
      if (this.expanded && !this.leaf) {
        togglerElement.click();
        return false;
      }
      var target = this.findBeforeClickableNode(event.currentTarget);
      if (target) {
        this.focusRowChange(event.currentTarget, target);
      }
    },
    onEnterKey: function onEnterKey(event) {
      this.setTabIndexForSelectionMode(event, this.nodeTouched);
      this.onClick(event);
      event.preventDefault();
    },
    onTabKey: function onTabKey() {
      this.setAllNodesTabIndexes();
    },
    setAllNodesTabIndexes: function setAllNodesTabIndexes() {
      var nodes = utils.DomHandler.find(this.$refs.currentNode.closest('[data-pc-section="container"]'), '[role="treeitem"]');
      var hasSelectedNode = _toConsumableArray$1(nodes).some(function (node) {
        return node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true';
      });
      _toConsumableArray$1(nodes).forEach(function (node) {
        node.tabIndex = -1;
      });
      if (hasSelectedNode) {
        var selectedNodes = _toConsumableArray$1(nodes).filter(function (node) {
          return node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true';
        });
        selectedNodes[0].tabIndex = 0;
        return;
      }
      _toConsumableArray$1(nodes)[0].tabIndex = 0;
    },
    setTabIndexForSelectionMode: function setTabIndexForSelectionMode(event, nodeTouched) {
      if (this.selectionMode !== null) {
        var elements = _toConsumableArray$1(utils.DomHandler.find(this.$refs.currentNode.parentElement, '[role="treeitem"]'));
        event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;
        if (elements.every(function (element) {
          return element.tabIndex === -1;
        })) {
          elements[0].tabIndex = 0;
        }
      }
    },
    focusRowChange: function focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant) {
      firstFocusableRow.tabIndex = '-1';
      currentFocusedRow.tabIndex = '0';
      this.focusNode(lastVisibleDescendant || currentFocusedRow);
    },
    findBeforeClickableNode: function findBeforeClickableNode(node) {
      var parentListElement = node.closest('ul').closest('li');
      if (parentListElement) {
        var prevNodeButton = utils.DomHandler.findSingle(parentListElement, 'button');
        if (prevNodeButton && prevNodeButton.style.visibility !== 'hidden') {
          return parentListElement;
        }
        return this.findBeforeClickableNode(node.previousElementSibling);
      }
      return null;
    },
    toggleCheckbox: function toggleCheckbox() {
      var _selectionKeys = this.selectionKeys ? _objectSpread$1({}, this.selectionKeys) : {};
      var _check = !this.checked;
      this.propagateDown(this.node, _check, _selectionKeys);
      this.$emit('checkbox-change', {
        node: this.node,
        check: _check,
        selectionKeys: _selectionKeys
      });
    },
    propagateDown: function propagateDown(node, check, selectionKeys) {
      if (check) selectionKeys[node.key] = {
        checked: true,
        partialChecked: false
      };else delete selectionKeys[node.key];
      if (node.children && node.children.length) {
        var _iterator = _createForOfIteratorHelper$1(node.children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            this.propagateDown(child, check, selectionKeys);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    },
    propagateUp: function propagateUp(event) {
      var check = event.check;
      var _selectionKeys = _objectSpread$1({}, event.selectionKeys);
      var checkedChildCount = 0;
      var childPartialSelected = false;
      var _iterator2 = _createForOfIteratorHelper$1(this.node.children),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;
          if (_selectionKeys[child.key] && _selectionKeys[child.key].checked) checkedChildCount++;else if (_selectionKeys[child.key] && _selectionKeys[child.key].partialChecked) childPartialSelected = true;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (check && checkedChildCount === this.node.children.length) {
        _selectionKeys[this.node.key] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete _selectionKeys[this.node.key];
        }
        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.node.children.length) _selectionKeys[this.node.key] = {
          checked: false,
          partialChecked: true
        };else delete _selectionKeys[this.node.key];
      }
      this.$emit('checkbox-change', {
        node: event.node,
        check: event.check,
        selectionKeys: _selectionKeys
      });
    },
    onChildCheckboxChange: function onChildCheckboxChange(event) {
      this.$emit('checkbox-change', event);
    },
    findNextSiblingOfAncestor: function findNextSiblingOfAncestor(nodeElement) {
      var parentNodeElement = this.getParentNodeElement(nodeElement);
      if (parentNodeElement) {
        if (parentNodeElement.nextElementSibling) return parentNodeElement.nextElementSibling;else return this.findNextSiblingOfAncestor(parentNodeElement);
      } else {
        return null;
      }
    },
    findLastVisibleDescendant: function findLastVisibleDescendant(nodeElement) {
      var childrenListElement = nodeElement.children[1];
      if (childrenListElement) {
        var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
        return this.findLastVisibleDescendant(lastChildElement);
      } else {
        return nodeElement;
      }
    },
    getParentNodeElement: function getParentNodeElement(nodeElement) {
      var parentNodeElement = nodeElement.parentElement.parentElement;
      return utils.DomHandler.getAttribute(parentNodeElement, 'role') === 'treeitem' ? parentNodeElement : null;
    },
    focusNode: function focusNode(element) {
      element.focus();
    },
    isCheckboxSelectionMode: function isCheckboxSelectionMode() {
      return this.selectionMode === 'checkbox';
    },
    isSameNode: function isSameNode(event) {
      return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('[role="treeitem"]')));
    }
  },
  computed: {
    hasChildren: function hasChildren() {
      return this.node.children && this.node.children.length > 0;
    },
    expanded: function expanded() {
      return this.expandedKeys && this.expandedKeys[this.node.key] === true;
    },
    leaf: function leaf() {
      return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
    },
    selectable: function selectable() {
      return this.node.selectable === false ? false : this.selectionMode != null;
    },
    selected: function selected() {
      return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.node.key] === true : false;
    },
    checkboxMode: function checkboxMode() {
      return this.selectionMode === 'checkbox' && this.node.selectable !== false;
    },
    checked: function checked() {
      return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].checked : false;
    },
    partialChecked: function partialChecked() {
      return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].partialChecked : false;
    },
    ariaChecked: function ariaChecked() {
      return this.selectionMode === 'single' || this.selectionMode === 'multiple' ? this.selected : undefined;
    },
    ariaSelected: function ariaSelected() {
      return this.checkboxMode ? this.checked : undefined;
    }
  },
  components: {
    Checkbox: Checkbox__default["default"],
    ChevronDownIcon: ChevronDownIcon__default["default"],
    ChevronRightIcon: ChevronRightIcon__default["default"],
    CheckIcon: CheckIcon__default["default"],
    MinusIcon: MinusIcon__default["default"],
    SpinnerIcon: SpinnerIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

var _hoisted_1$1 = ["aria-label", "aria-selected", "aria-expanded", "aria-setsize", "aria-posinset", "aria-level", "aria-checked", "tabindex"];
var _hoisted_2$1 = ["data-p-highlight", "data-p-selectable"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
  var _component_Checkbox = vue.resolveComponent("Checkbox");
  var _component_TreeNode = vue.resolveComponent("TreeNode", true);
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
    ref: "currentNode",
    "class": _ctx.cx('node'),
    role: "treeitem",
    "aria-label": $options.label($props.node),
    "aria-selected": $options.ariaSelected,
    "aria-expanded": $options.expanded,
    "aria-setsize": $props.node.children ? $props.node.children.length : 0,
    "aria-posinset": $props.index + 1,
    "aria-level": $props.level,
    "aria-checked": $options.ariaChecked,
    tabindex: $props.index === 0 ? 0 : -1,
    onKeydown: _cache[4] || (_cache[4] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, $props.level === 1 ? $options.getPTOptions('node') : _ctx.ptm('subgroup')), [vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('content'),
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onTouchend: _cache[3] || (_cache[3] = function () {
      return $options.onTouchEnd && $options.onTouchEnd.apply($options, arguments);
    }),
    style: $props.node.style
  }, $options.getPTOptions('content'), {
    "data-p-highlight": $options.checkboxMode ? $options.checked : $options.selected,
    "data-p-selectable": $options.selectable
  }), [vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    type: "button",
    "class": _ctx.cx('toggler'),
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.toggle && $options.toggle.apply($options, arguments);
    }),
    tabindex: "-1",
    "aria-hidden": "true"
  }, $options.getPTOptions('toggler')), [$props.node.loading && $props.loadingMode === 'icon' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 0
  }, [$props.templates['nodetogglericon'] ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['nodetogglericon']), {
    key: 0,
    "class": vue.normalizeClass(_ctx.cx('nodetogglericon'))
  }, null, 8, ["class"])) : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
    key: 1,
    spin: "",
    "class": _ctx.cx('nodetogglericon')
  }, _ctx.ptm('nodetogglericon')), null, 16, ["class"]))], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 1
  }, [$props.templates['togglericon'] ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['togglericon']), {
    key: 0,
    node: $props.node,
    expanded: $options.expanded,
    "class": vue.normalizeClass(_ctx.cx('togglerIcon'))
  }, null, 8, ["node", "expanded", "class"])) : $options.expanded ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.node.expandedIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
    key: 1,
    "class": _ctx.cx('togglerIcon')
  }, $options.getPTOptions('togglerIcon')), null, 16, ["class"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.node.collapsedIcon ? 'span' : 'ChevronRightIcon'), vue.mergeProps({
    key: 2,
    "class": _ctx.cx('togglerIcon')
  }, $options.getPTOptions('togglerIcon')), null, 16, ["class"]))], 64))], 16)), [[_directive_ripple]]), $options.checkboxMode ? (vue.openBlock(), vue.createBlock(_component_Checkbox, {
    key: 0,
    modelValue: $options.checked,
    binary: true,
    "class": vue.normalizeClass(_ctx.cx('nodeCheckbox')),
    tabindex: -1,
    unstyled: _ctx.unstyled,
    pt: $options.getPTOptions('nodeCheckbox'),
    "data-p-checked": $options.checked,
    "data-p-partialchecked": $options.partialChecked
  }, {
    icon: vue.withCtx(function (slotProps) {
      return [$props.templates['checkboxicon'] ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['checkboxicon']), {
        key: 0,
        checked: slotProps.checked,
        partialChecked: $options.partialChecked,
        "class": vue.normalizeClass(slotProps["class"])
      }, null, 8, ["checked", "partialChecked", "class"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.checked ? 'CheckIcon' : $options.partialChecked ? 'MinusIcon' : null), vue.mergeProps({
        key: 1,
        "class": slotProps["class"]
      }, $options.getPTOptions('nodeCheckbox.icon')), null, 16, ["class"]))];
    }),
    _: 1
  }, 8, ["modelValue", "class", "unstyled", "pt", "data-p-checked", "data-p-partialchecked"])) : vue.createCommentVNode("", true), $props.templates['nodeicon'] ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['nodeicon']), vue.mergeProps({
    key: 1,
    node: $props.node,
    "class": [_ctx.cx('nodeIcon')]
  }, $options.getPTOptions('nodeIcon')), null, 16, ["node", "class"])) : (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 2,
    "class": [_ctx.cx('nodeIcon'), $props.node.icon]
  }, $options.getPTOptions('nodeIcon')), null, 16)), vue.createElementVNode("span", vue.mergeProps({
    "class": _ctx.cx('label')
  }, $options.getPTOptions('label'), {
    onKeydown: _cache[1] || (_cache[1] = vue.withModifiers(function () {}, ["stop"]))
  }), [$props.templates[$props.node.type] || $props.templates['default'] ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates[$props.node.type] || $props.templates['default']), {
    key: 0,
    node: $props.node
  }, null, 8, ["node"])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 1
  }, [vue.createTextVNode(vue.toDisplayString($options.label($props.node)), 1)], 64))], 16)], 16, _hoisted_2$1), $options.hasChildren && $options.expanded ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('subgroup'),
    role: "group"
  }, _ctx.ptm('subgroup')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.node.children, function (childNode) {
    return vue.openBlock(), vue.createBlock(_component_TreeNode, {
      key: childNode.key,
      node: childNode,
      templates: $props.templates,
      level: $props.level + 1,
      loadingMode: $props.loadingMode,
      expandedKeys: $props.expandedKeys,
      onNodeToggle: $options.onChildNodeToggle,
      onNodeClick: $options.onChildNodeClick,
      selectionMode: $props.selectionMode,
      selectionKeys: $props.selectionKeys,
      onCheckboxChange: $options.propagateUp,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["node", "templates", "level", "loadingMode", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange", "unstyled", "pt"]);
  }), 128))], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_1$1);
}

script$1.render = render$1;

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var script = {
  name: 'Tree',
  "extends": script$2,
  inheritAttrs: false,
  emits: ['node-expand', 'node-collapse', 'update:expandedKeys', 'update:selectionKeys', 'node-select', 'node-unselect', 'filter'],
  data: function data() {
    return {
      d_expandedKeys: this.expandedKeys || {},
      filterValue: null
    };
  },
  watch: {
    expandedKeys: function expandedKeys(newValue) {
      this.d_expandedKeys = newValue;
    }
  },
  methods: {
    onNodeToggle: function onNodeToggle(node) {
      var key = node.key;
      if (this.d_expandedKeys[key]) {
        delete this.d_expandedKeys[key];
        this.$emit('node-collapse', node);
      } else {
        this.d_expandedKeys[key] = true;
        this.$emit('node-expand', node);
      }
      this.d_expandedKeys = _objectSpread({}, this.d_expandedKeys);
      this.$emit('update:expandedKeys', this.d_expandedKeys);
    },
    onNodeClick: function onNodeClick(event) {
      if (this.selectionMode != null && event.node.selectable !== false) {
        var metaSelection = event.nodeTouched ? false : this.metaKeySelection;
        var _selectionKeys = metaSelection ? this.handleSelectionWithMetaKey(event) : this.handleSelectionWithoutMetaKey(event);
        this.$emit('update:selectionKeys', _selectionKeys);
      }
    },
    onCheckboxChange: function onCheckboxChange(event) {
      this.$emit('update:selectionKeys', event.selectionKeys);
      if (event.check) this.$emit('node-select', event.node);else this.$emit('node-unselect', event.node);
    },
    handleSelectionWithMetaKey: function handleSelectionWithMetaKey(event) {
      var originalEvent = event.originalEvent;
      var node = event.node;
      var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
      var selected = this.isNodeSelected(node);
      var _selectionKeys;
      if (selected && metaKey) {
        if (this.isSingleSelectionMode()) {
          _selectionKeys = {};
        } else {
          _selectionKeys = _objectSpread({}, this.selectionKeys);
          delete _selectionKeys[node.key];
        }
        this.$emit('node-unselect', node);
      } else {
        if (this.isSingleSelectionMode()) {
          _selectionKeys = {};
        } else if (this.isMultipleSelectionMode()) {
          _selectionKeys = !metaKey ? {} : this.selectionKeys ? _objectSpread({}, this.selectionKeys) : {};
        }
        _selectionKeys[node.key] = true;
        this.$emit('node-select', node);
      }
      return _selectionKeys;
    },
    handleSelectionWithoutMetaKey: function handleSelectionWithoutMetaKey(event) {
      var node = event.node;
      var selected = this.isNodeSelected(node);
      var _selectionKeys;
      if (this.isSingleSelectionMode()) {
        if (selected) {
          _selectionKeys = {};
          this.$emit('node-unselect', node);
        } else {
          _selectionKeys = {};
          _selectionKeys[node.key] = true;
          this.$emit('node-select', node);
        }
      } else {
        if (selected) {
          _selectionKeys = _objectSpread({}, this.selectionKeys);
          delete _selectionKeys[node.key];
          this.$emit('node-unselect', node);
        } else {
          _selectionKeys = this.selectionKeys ? _objectSpread({}, this.selectionKeys) : {};
          _selectionKeys[node.key] = true;
          this.$emit('node-select', node);
        }
      }
      return _selectionKeys;
    },
    isSingleSelectionMode: function isSingleSelectionMode() {
      return this.selectionMode === 'single';
    },
    isMultipleSelectionMode: function isMultipleSelectionMode() {
      return this.selectionMode === 'multiple';
    },
    isNodeSelected: function isNodeSelected(node) {
      return this.selectionMode && this.selectionKeys ? this.selectionKeys[node.key] === true : false;
    },
    isChecked: function isChecked(node) {
      return this.selectionKeys ? this.selectionKeys[node.key] && this.selectionKeys[node.key].checked : false;
    },
    isNodeLeaf: function isNodeLeaf(node) {
      return node.leaf === false ? false : !(node.children && node.children.length);
    },
    onFilterKeydown: function onFilterKeydown(event) {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
      }
      this.$emit('filter', {
        originalEvent: event,
        value: event.target.value
      });
    },
    findFilteredNodes: function findFilteredNodes(node, paramsWithoutNode) {
      if (node) {
        var matched = false;
        if (node.children) {
          var childNodes = _toConsumableArray(node.children);
          node.children = [];
          var _iterator = _createForOfIteratorHelper(childNodes),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var childNode = _step.value;
              var copyChildNode = _objectSpread({}, childNode);
              if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                matched = true;
                node.children.push(copyChildNode);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        if (matched) {
          return true;
        }
      }
    },
    isFilterMatched: function isFilterMatched(node, _ref) {
      var searchFields = _ref.searchFields,
        filterText = _ref.filterText,
        strict = _ref.strict;
      var matched = false;
      var _iterator2 = _createForOfIteratorHelper(searchFields),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var field = _step2.value;
          var fieldValue = String(utils.ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(this.filterLocale);
          if (fieldValue.indexOf(filterText) > -1) {
            matched = true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (!matched || strict && !this.isNodeLeaf(node)) {
        matched = this.findFilteredNodes(node, {
          searchFields: searchFields,
          filterText: filterText,
          strict: strict
        }) || matched;
      }
      return matched;
    }
  },
  computed: {
    filteredValue: function filteredValue() {
      var filteredNodes = [];
      var searchFields = this.filterBy.split(',');
      var filterText = this.filterValue.trim().toLocaleLowerCase(this.filterLocale);
      var strict = this.filterMode === 'strict';
      var _iterator3 = _createForOfIteratorHelper(this.value),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var node = _step3.value;
          var _node = _objectSpread({}, node);
          var paramsWithoutNode = {
            searchFields: searchFields,
            filterText: filterText,
            strict: strict
          };
          if (strict && (this.findFilteredNodes(_node, paramsWithoutNode) || this.isFilterMatched(_node, paramsWithoutNode)) || !strict && (this.isFilterMatched(_node, paramsWithoutNode) || this.findFilteredNodes(_node, paramsWithoutNode))) {
            filteredNodes.push(_node);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return filteredNodes;
    },
    valueToRender: function valueToRender() {
      if (this.filterValue && this.filterValue.trim().length > 0) return this.filteredValue;else return this.value;
    }
  },
  components: {
    TreeNode: script$1,
    SearchIcon: SearchIcon__default["default"],
    SpinnerIcon: SpinnerIcon__default["default"]
  }
};

var _hoisted_1 = ["placeholder"];
var _hoisted_2 = ["aria-labelledby", "aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
  var _component_SearchIcon = vue.resolveComponent("SearchIcon");
  var _component_TreeNode = vue.resolveComponent("TreeNode");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [_ctx.loading && _ctx.loadingMode === 'mask' ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('loadingOverlay')
  }, _ctx.ptm('loadingOverlay')), [vue.renderSlot(_ctx.$slots, "loadingicon", {
    "class": vue.normalizeClass(_ctx.cx('loadingIcon'))
  }, function () {
    return [_ctx.loadingIcon ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
      key: 0,
      "class": [_ctx.cx('loadingIcon'), 'pi-spin', _ctx.loadingIcon]
    }, _ctx.ptm('loadingIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
      key: 1,
      spin: "",
      "class": _ctx.cx('loadingIcon')
    }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
  })], 16)) : vue.createCommentVNode("", true), _ctx.filter ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('filterContainer')
  }, _ctx.ptm('filterContainer')), [vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.filterValue = $event;
    }),
    type: "text",
    autocomplete: "off",
    "class": _ctx.cx('input'),
    placeholder: _ctx.filterPlaceholder,
    onKeydown: _cache[1] || (_cache[1] = function () {
      return $options.onFilterKeydown && $options.onFilterKeydown.apply($options, arguments);
    })
  }, _ctx.ptm('input')), null, 16, _hoisted_1), [[vue.vModelText, $data.filterValue]]), vue.renderSlot(_ctx.$slots, "searchicon", {
    "class": vue.normalizeClass(_ctx.cx('searchIcon'))
  }, function () {
    return [vue.createVNode(_component_SearchIcon, vue.mergeProps({
      "class": _ctx.cx('searchIcon')
    }, _ctx.ptm('searchIcon')), null, 16, ["class"])];
  })], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('wrapper'),
    style: {
      maxHeight: _ctx.scrollHeight
    }
  }, _ctx.ptm('wrapper')), [vue.createElementVNode("ul", vue.mergeProps({
    "class": _ctx.cx('container'),
    role: "tree",
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, _ctx.ptm('container')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.valueToRender, function (node, index) {
    return vue.openBlock(), vue.createBlock(_component_TreeNode, {
      key: node.key,
      node: node,
      templates: _ctx.$slots,
      level: _ctx.level + 1,
      index: index,
      expandedKeys: $data.d_expandedKeys,
      onNodeToggle: $options.onNodeToggle,
      onNodeClick: $options.onNodeClick,
      selectionMode: _ctx.selectionMode,
      selectionKeys: _ctx.selectionKeys,
      onCheckboxChange: $options.onCheckboxChange,
      loadingMode: _ctx.loadingMode,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["node", "templates", "level", "index", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange", "loadingMode", "unstyled", "pt"]);
  }), 128))], 16, _hoisted_2)], 16)], 16);
}

script.render = render;

module.exports = script;
