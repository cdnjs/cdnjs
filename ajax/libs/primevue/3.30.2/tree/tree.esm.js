import SearchIcon from 'primevue/icons/search';
import SpinnerIcon from 'primevue/icons/spinner';
import { DomHandler, ObjectUtils } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import CheckIcon from 'primevue/icons/check';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import ChevronRightIcon from 'primevue/icons/chevronright';
import MinusIcon from 'primevue/icons/minus';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, withDirectives, createBlock, resolveDynamicComponent, normalizeClass, createCommentVNode, Fragment, createTextVNode, toDisplayString, renderList, renderSlot, vModelText, createVNode } from 'vue';

var styles = "\n.p-tree-container {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    overflow: auto;\n}\n\n.p-treenode-children {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n\n.p-tree-wrapper {\n    overflow: auto;\n}\n\n.p-treenode-selectable {\n    cursor: pointer;\n    user-select: none;\n}\n\n.p-tree-toggler {\n    cursor: pointer;\n    user-select: none;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n    flex-shrink: 0;\n}\n\n.p-treenode-leaf > .p-treenode-content .p-tree-toggler {\n    visibility: hidden;\n}\n\n.p-treenode-content {\n    display: flex;\n    align-items: center;\n}\n\n.p-tree-filter {\n    width: 100%;\n}\n\n.p-tree-filter-container {\n    position: relative;\n    display: block;\n    width: 100%;\n}\n\n.p-tree-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n\n.p-tree-loading {\n    position: relative;\n    min-height: 4rem;\n}\n\n.p-tree .p-tree-loading-overlay {\n    position: absolute;\n    z-index: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-tree-flex-scrollable {\n    display: flex;\n    flex: 1;\n    height: 100%;\n    flex-direction: column;\n}\n\n.p-tree-flex-scrollable .p-tree-wrapper {\n    flex: 1;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-tree p-component', {
      'p-tree-selectable': props.selectionMode != null,
      'p-tree-loading': props.loading,
      'p-tree-flex-scrollable': props.scrollHeight === 'flex'
    }];
  },
  loadingOverlay: 'p-tree-loading-overlay p-component-overlay',
  loadingIcon: 'p-tree-loading-icon',
  filterContainer: 'p-tree-filter-container',
  input: 'p-tree-filter p-inputtext p-component',
  searchIcon: 'p-tree-filter-icon',
  wrapper: 'p-tree-wrapper',
  container: 'p-tree-container',
  node: function node(_ref2) {
    var instance = _ref2.instance;
    return ['p-treenode', {
      'p-treenode-leaf': instance.leaf
    }];
  },
  content: function content(_ref3) {
    var instance = _ref3.instance;
    return ['p-treenode-content', instance.node.styleClass, {
      'p-treenode-selectable': instance.selectable,
      'p-highlight': instance.checkboxMode ? instance.checked : instance.selected
    }];
  },
  toggler: 'p-tree-toggler p-link',
  togglerIcon: 'p-tree-toggler-icon',
  checkboxContainer: 'p-checkbox p-component',
  checkbox: function checkbox(_ref4) {
    var instance = _ref4.instance;
    return ['p-checkbox-box', {
      'p-highlight': instance.checked,
      'p-indeterminate': instance.partialChecked
    }];
  },
  checkboxIcon: 'p-checkbox-icon',
  nodeIcon: function nodeIcon(_ref5) {
    var instance = _ref5.instance;
    return ['p-treenode-icon', instance.node.icon];
  },
  label: 'p-treenode-label',
  subgroup: 'p-treenode-children'
};
var _useStyle = useStyle(styles, {
    name: 'tree',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$2 = {
  name: 'BaseTree',
  "extends": BaseComponent,
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
      "default": true
    },
    loading: {
      type: Boolean,
      "default": false
    },
    loadingIcon: {
      type: String,
      "default": undefined
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
    scrollHeight: {
      type: String,
      "default": null
    },
    level: {
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
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script$1 = {
  name: 'TreeNode',
  hostName: 'Tree',
  "extends": BaseComponent,
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
    index: {
      type: Number,
      "default": null
    }
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
      if (this.toggleClicked || DomHandler.getAttribute(event.target, '[data-pc-section="toggler"]') || DomHandler.getAttribute(event.target.parentElement, '[data-pc-section="toggler"]')) {
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
      var togglerElement = DomHandler.findSingle(event.currentTarget, '[data-pc-section="toggler"]');
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
      var nodes = DomHandler.find(this.$refs.currentNode.closest('[data-pc-section="container"]'), '[role="treeitem"]');
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
        var elements = _toConsumableArray$1(DomHandler.find(this.$refs.currentNode.parentElement, '[role="treeitem"]'));
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
        var prevNodeButton = DomHandler.findSingle(parentListElement, 'button');
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
      return DomHandler.getAttribute(parentNodeElement, 'role') === 'treeitem' ? parentNodeElement : null;
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
    ChevronDownIcon: ChevronDownIcon,
    ChevronRightIcon: ChevronRightIcon,
    CheckIcon: CheckIcon,
    MinusIcon: MinusIcon
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1$1 = ["aria-label", "aria-selected", "aria-expanded", "aria-setsize", "aria-posinset", "aria-level", "aria-checked", "tabindex"];
var _hoisted_2$1 = ["data-p-highlight", "data-p-selectable"];
var _hoisted_3 = ["data-p-checked", "data-p-partialchecked"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TreeNode = resolveComponent("TreeNode", true);
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("li", mergeProps({
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
    onKeydown: _cache[3] || (_cache[3] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, $props.level === 1 ? $options.getPTOptions('node') : _ctx.ptm('subgroup')), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('content'),
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onTouchend: _cache[2] || (_cache[2] = function () {
      return $options.onTouchEnd && $options.onTouchEnd.apply($options, arguments);
    }),
    style: $props.node.style
  }, $options.getPTOptions('content'), {
    "data-p-highlight": $options.checkboxMode ? $options.checked : $options.selected,
    "data-p-selectable": $options.selectable
  }), [withDirectives((openBlock(), createElementBlock("button", mergeProps({
    type: "button",
    "class": _ctx.cx('toggler'),
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.toggle && $options.toggle.apply($options, arguments);
    }),
    tabindex: "-1",
    "aria-hidden": "true"
  }, $options.getPTOptions('toggler')), [$props.templates['togglericon'] ? (openBlock(), createBlock(resolveDynamicComponent($props.templates['togglericon']), {
    key: 0,
    node: $props.node,
    expanded: $options.expanded,
    "class": normalizeClass(_ctx.cx('togglerIcon'))
  }, null, 8, ["node", "expanded", "class"])) : $options.expanded ? (openBlock(), createBlock(resolveDynamicComponent($props.node.expandedIcon ? 'span' : 'ChevronDownIcon'), mergeProps({
    key: 1,
    "class": _ctx.cx('togglerIcon')
  }, $options.getPTOptions('togglerIcon')), null, 16, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent($props.node.collapsedIcon ? 'span' : 'ChevronRightIcon'), mergeProps({
    key: 2,
    "class": _ctx.cx('togglerIcon')
  }, $options.getPTOptions('togglerIcon')), null, 16, ["class"]))], 16)), [[_directive_ripple]]), $options.checkboxMode ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('checkboxContainer'),
    "aria-hidden": "true"
  }, $options.getPTOptions('checkboxContainer')), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('checkbox'),
    role: "checkbox"
  }, $options.getPTOptions('checkbox'), {
    "data-p-checked": $options.checked,
    "data-p-partialchecked": $options.partialChecked
  }), [$props.templates['checkboxicon'] ? (openBlock(), createBlock(resolveDynamicComponent($props.templates['checkboxicon']), {
    key: 0,
    checked: $options.checked,
    partialChecked: $options.partialChecked,
    "class": normalizeClass(_ctx.cx('checkboxIcon'))
  }, null, 8, ["checked", "partialChecked", "class"])) : (openBlock(), createBlock(resolveDynamicComponent($options.checked ? 'CheckIcon' : $options.partialChecked ? 'MinusIcon' : null), mergeProps({
    key: 1,
    "class": _ctx.cx('checkboxIcon')
  }, $options.getPTOptions('checkboxIcon')), null, 16, ["class"]))], 16, _hoisted_3)], 16)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
    "class": _ctx.cx('nodeIcon')
  }, $options.getPTOptions('nodeIcon')), null, 16), createElementVNode("span", mergeProps({
    "class": _ctx.cx('label')
  }, $options.getPTOptions('label')), [$props.templates[$props.node.type] || $props.templates['default'] ? (openBlock(), createBlock(resolveDynamicComponent($props.templates[$props.node.type] || $props.templates['default']), {
    key: 0,
    node: $props.node
  }, null, 8, ["node"])) : (openBlock(), createElementBlock(Fragment, {
    key: 1
  }, [createTextVNode(toDisplayString($options.label($props.node)), 1)], 64))], 16)], 16, _hoisted_2$1), $options.hasChildren && $options.expanded ? (openBlock(), createElementBlock("ul", mergeProps({
    key: 0,
    "class": _ctx.cx('subgroup'),
    role: "group"
  }, _ctx.ptm('subgroup')), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.node.children, function (childNode) {
    return openBlock(), createBlock(_component_TreeNode, {
      key: childNode.key,
      node: childNode,
      templates: $props.templates,
      level: $props.level + 1,
      expandedKeys: $props.expandedKeys,
      onNodeToggle: $options.onChildNodeToggle,
      onNodeClick: $options.onChildNodeClick,
      selectionMode: $props.selectionMode,
      selectionKeys: $props.selectionKeys,
      onCheckboxChange: $options.propagateUp,
      pt: _ctx.pt
    }, null, 8, ["node", "templates", "level", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange", "pt"]);
  }), 128))], 16)) : createCommentVNode("", true)], 16, _hoisted_1$1);
}

script$1.render = render$1;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var script = {
  name: 'Tree',
  "extends": script$2,
  emits: ['node-expand', 'node-collapse', 'update:expandedKeys', 'update:selectionKeys', 'node-select', 'node-unselect'],
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
      if (event.which === 13) {
        event.preventDefault();
      }
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
          var fieldValue = String(ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(this.filterLocale);
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
    SearchIcon: SearchIcon,
    SpinnerIcon: SpinnerIcon
  }
};

var _hoisted_1 = ["placeholder"];
var _hoisted_2 = ["aria-labelledby", "aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_SearchIcon = resolveComponent("SearchIcon");
  var _component_TreeNode = resolveComponent("TreeNode");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "tree"
  }), [_ctx.loading ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('loadingOverlay')
  }, _ctx.ptm('loadingOverlay')), [renderSlot(_ctx.$slots, "loadingicon", {
    "class": normalizeClass(_ctx.cx('loadingIcon'))
  }, function () {
    return [_ctx.loadingIcon ? (openBlock(), createElementBlock("i", mergeProps({
      key: 0,
      "class": [_ctx.cx('loadingIcon'), 'pi-spin', _ctx.loadingIcon]
    }, _ctx.ptm('loadingIcon')), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
      key: 1,
      spin: "",
      "class": _ctx.cx('loadingIcon')
    }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
  })], 16)) : createCommentVNode("", true), _ctx.filter ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx('filterContainer')
  }, _ctx.ptm('filterContainer')), [withDirectives(createElementVNode("input", mergeProps({
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
  }, _ctx.ptm('input')), null, 16, _hoisted_1), [[vModelText, $data.filterValue]]), renderSlot(_ctx.$slots, "searchicon", {
    "class": normalizeClass(_ctx.cx('searchIcon'))
  }, function () {
    return [createVNode(_component_SearchIcon, mergeProps({
      "class": _ctx.cx('searchIcon')
    }, _ctx.ptm('searchIcon')), null, 16, ["class"])];
  })], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    "class": _ctx.cx('wrapper'),
    style: {
      maxHeight: _ctx.scrollHeight
    }
  }, _ctx.ptm('wrapper')), [createElementVNode("ul", mergeProps({
    "class": _ctx.cx('container'),
    role: "tree",
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, _ctx.ptm('container')), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.valueToRender, function (node, index) {
    return openBlock(), createBlock(_component_TreeNode, {
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
      pt: _ctx.pt
    }, null, 8, ["node", "templates", "level", "index", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange", "pt"]);
  }), 128))], 16, _hoisted_2)], 16)], 16);
}

script.render = render;

export { script as default };
