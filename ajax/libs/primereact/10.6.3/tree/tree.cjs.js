'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var search = require('primereact/icons/search');
var spinner = require('primereact/icons/spinner');
var utils = require('primereact/utils');
var check = require('primereact/icons/check');
var chevrondown = require('primereact/icons/chevrondown');
var chevronright = require('primereact/icons/chevronright');
var minus = require('primereact/icons/minus');
var ripple = require('primereact/ripple');
var tooltip = require('primereact/tooltip');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
}

/* eslint-disable */
var useUpdateEffect = function useUpdateEffect(fn, deps) {
  var mounted = React__namespace.useRef(false);
  return React__namespace.useEffect(function () {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return fn && fn();
  }, deps);
};
/* eslint-enable */

var classes$1 = {
  root: function root(_ref) {
    var props = _ref.props;
    return utils.classNames('p-tree p-component', {
      'p-tree-selectable': props.selectionMode,
      'p-tree-loading': props.loading,
      'p-disabled': props.disabled
    });
  },
  loadingOverlay: 'p-tree-loading-overlay p-component-overlay',
  loadingIcon: 'p-tree-loading-icon',
  filterContainer: 'p-tree-filter-container',
  input: 'p-tree-filter p-inputtext p-component',
  searchIcon: 'p-tree-filter-icon',
  container: 'p-tree-container',
  node: function node(_ref2) {
    var isLeaf = _ref2.isLeaf;
    return utils.classNames('p-treenode', {
      'p-treenode-leaf': isLeaf
    });
  },
  content: function content(_ref3) {
    var props = _ref3.nodeProps,
      checked = _ref3.checked,
      selected = _ref3.selected,
      isCheckboxSelectionMode = _ref3.isCheckboxSelectionMode;
    return utils.classNames('p-treenode-content', {
      'p-treenode-selectable': props.selectionMode && props.node.selectable !== false,
      'p-highlight': isCheckboxSelectionMode() ? checked : selected,
      'p-highlight-contextmenu': props.contextMenuSelectionKey && props.contextMenuSelectionKey === props.node.key,
      'p-disabled': props.disabled
    });
  },
  toggler: 'p-tree-toggler p-link',
  togglerIcon: 'p-tree-toggler-icon',
  nodeCheckbox: function nodeCheckbox(_ref4) {
    var partialChecked = _ref4.partialChecked;
    return utils.classNames({
      'p-indeterminate': partialChecked
    });
  },
  nodeIcon: 'p-treenode-icon',
  label: 'p-treenode-label',
  subgroup: 'p-treenode-children',
  checkIcon: 'p-checkbox-icon',
  emptyMessage: 'p-treenode p-tree-empty-message',
  droppoint: 'p-treenode-droppoint',
  header: 'p-tree-header',
  footer: 'p-tree-footer'
};
var TreeBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Tree',
    __parentMetadata: null,
    id: null,
    value: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    checkboxIcon: null,
    className: null,
    collapseIcon: null,
    contentClassName: null,
    contentStyle: null,
    contextMenuSelectionKey: null,
    disabled: false,
    dragdropScope: null,
    emptyMessage: null,
    expandIcon: null,
    expandedKeys: null,
    filter: false,
    filterBy: 'label',
    filterIcon: null,
    filterLocale: undefined,
    filterMode: 'lenient',
    filterPlaceholder: null,
    filterTemplate: null,
    filterValue: null,
    footer: null,
    header: null,
    level: 0,
    loading: false,
    loadingIcon: null,
    metaKeySelection: false,
    nodeTemplate: null,
    onCollapse: null,
    onContextMenu: null,
    onContextMenuSelectionChange: null,
    onDragDrop: null,
    onExpand: null,
    onFilterValueChange: null,
    onNodeClick: null,
    onNodeDoubleClick: null,
    onSelect: null,
    onSelectionChange: null,
    onToggle: null,
    onUnselect: null,
    propagateSelectionDown: true,
    propagateSelectionUp: true,
    selectionKeys: null,
    selectionMode: null,
    showHeader: true,
    style: null,
    togglerTemplate: null,
    children: undefined
  },
  css: {
    classes: classes$1
  }
});

var classes = {
  box: 'p-checkbox-box',
  input: 'p-checkbox-input',
  icon: 'p-checkbox-icon',
  root: function root(_ref) {
    var props = _ref.props,
      checked = _ref.checked,
      context = _ref.context;
    return utils.classNames('p-checkbox p-component', {
      'p-highlight': checked,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  }
};
var CheckboxBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Checkbox',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    falseValue: false,
    icon: null,
    id: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    variant: null,
    name: null,
    onChange: null,
    onContextMenu: null,
    onMouseDown: null,
    readOnly: false,
    required: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    trueValue: true,
    value: null,
    children: undefined
  },
  css: {
    classes: classes
  }
});

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Checkbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = CheckboxBase.getProps(inProps, context);
  var _CheckboxBase$setMeta = CheckboxBase.setMetaData({
      props: props,
      context: {
        checked: props.checked === props.trueValue,
        disabled: props.disabled
      }
    }),
    ptm = _CheckboxBase$setMeta.ptm,
    cx = _CheckboxBase$setMeta.cx,
    isUnstyled = _CheckboxBase$setMeta.isUnstyled;
  componentbase.useHandleStyle(CheckboxBase.css.styles, isUnstyled, {
    name: 'checkbox'
  });
  var elementRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var isChecked = function isChecked() {
    return props.checked === props.trueValue;
  };
  var _onChange = function onChange(event) {
    if (props.disabled || props.readonly) {
      return;
    }
    if (props.onChange) {
      var _props$onChange;
      var _checked = isChecked();
      var value = _checked ? props.falseValue : props.trueValue;
      var eventData = {
        originalEvent: event,
        value: props.value,
        checked: value,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          type: 'checkbox',
          name: props.name,
          id: props.id,
          value: props.value,
          checked: value
        }
      };
      props === null || props === void 0 || (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, eventData);

      // do not continue if the user defined click wants to prevent
      if (event.defaultPrevented) {
        return;
      }
      utils.DomHandler.focus(inputRef.current);
    }
  };
  var _onFocus = function onFocus() {
    var _props$onFocus;
    props === null || props === void 0 || (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props);
  };
  var _onBlur = function onBlur() {
    var _props$onBlur;
    props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props);
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return utils.DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  hooks.useUpdateEffect(function () {
    inputRef.current.checked = isChecked();
  }, [props.checked, props.trueValue]);
  hooks.useMountEffect(function () {
    if (props.autoFocus) {
      utils.DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var checked = isChecked();
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = CheckboxBase.getOtherProps(props);
  var rootProps = mergeProps({
    id: props.id,
    className: utils.classNames(props.className, cx('root', {
      checked: checked,
      context: context
    })),
    style: props.style,
    'data-p-highlight': checked,
    'data-p-disabled': props.disabled,
    onContextMenu: props.onContextMenu,
    onMouseDown: props.onMouseDown
  }, otherProps, ptm('root'));
  var createInputElement = function createInputElement() {
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var inputProps = mergeProps(_objectSpread$2({
      id: props.inputId,
      type: 'checkbox',
      className: cx('input'),
      name: props.name,
      tabIndex: props.tabIndex,
      onFocus: function onFocus(e) {
        return _onFocus();
      },
      onBlur: function onBlur(e) {
        return _onBlur();
      },
      onChange: function onChange(e) {
        return _onChange(e);
      },
      disabled: props.disabled,
      readOnly: props.readOnly,
      required: props.required,
      'aria-invalid': props.invalid,
      checked: checked
    }, ariaProps), ptm('input'));
    return /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: inputRef
    }, inputProps));
  };
  var createBoxElement = function createBoxElement() {
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var boxProps = mergeProps({
      className: cx('box', {
        checked: checked
      }),
      'data-p-highlight': checked,
      'data-p-disabled': props.disabled
    }, ptm('box'));
    var icon = checked ? props.icon || /*#__PURE__*/React__namespace.createElement(check.CheckIcon, iconProps) : null;
    var checkboxIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$2({}, iconProps), {
      props: props,
      checked: checked
    });
    return /*#__PURE__*/React__namespace.createElement("div", boxProps, checkboxIcon);
  };
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef
  }, rootProps), createInputElement(), createBoxElement()), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
Checkbox.displayName = 'Checkbox';

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var UITreeNode = /*#__PURE__*/React__namespace.memo(function (props) {
  var contentRef = React__namespace.useRef(null);
  var elementRef = React__namespace.useRef(null);
  var nodeTouched = React__namespace.useRef(false);
  var mergeProps = hooks.useMergeProps();
  var isLeaf = props.isNodeLeaf(props.node);
  var label = props.node.label;
  var expanded = (props.expandedKeys ? props.expandedKeys[props.node.key] !== undefined : false) || props.node.expanded;
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        selected: !isCheckboxSelectionMode() ? isSelected() : false,
        expanded: expanded || false,
        checked: isCheckboxSelectionMode() ? isChecked() : false,
        isLeaf: isLeaf
      }
    });
  };
  var expand = function expand(event) {
    var navigateFocusToChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var expandedKeys = props.expandedKeys ? _objectSpread$1({}, props.expandedKeys) : {};
    expandedKeys[props.node.key] = true;
    props.onToggle({
      originalEvent: event,
      value: expandedKeys,
      navigateFocusToChild: navigateFocusToChild
    });
    invokeToggleEvents(event, true);
  };
  var collapse = function collapse(event) {
    var expandedKeys = _objectSpread$1({}, props.expandedKeys);
    delete expandedKeys[props.node.key];
    props.onToggle({
      originalEvent: event,
      value: expandedKeys
    });
    invokeToggleEvents(event, false);
  };
  var onTogglerClick = function onTogglerClick(event) {
    if (props.disabled) {
      return;
    }
    expanded ? collapse(event) : expand(event, false);
    event.preventDefault();
    event.stopPropagation();
  };
  var invokeToggleEvents = function invokeToggleEvents(event, isExpanded) {
    if (isExpanded) {
      if (props.onExpand) {
        props.onExpand({
          originalEvent: event,
          node: props.node
        });
      }
    } else if (props.onCollapse) {
      props.onCollapse({
        originalEvent: event,
        node: props.node
      });
    }
  };
  var findNextSiblingOfAncestor = function findNextSiblingOfAncestor(nodeElement) {
    var parentNodeElement = getParentNodeElement(nodeElement);
    return parentNodeElement ? parentNodeElement.nextElementSibling || findNextSiblingOfAncestor(parentNodeElement) : null;
  };
  var findLastVisibleDescendant = function findLastVisibleDescendant(nodeElement) {
    var childrenListElement = nodeElement.children[1];
    if (childrenListElement) {
      var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
      return findLastVisibleDescendant(lastChildElement);
    }
    return nodeElement;
  };
  var getParentNodeElement = function getParentNodeElement(nodeElement) {
    var parentNodeElement = nodeElement.parentElement.parentElement;
    return utils.DomHandler.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
  };
  var focusNode = function focusNode(element) {
    element && element.focus();
  };
  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        node: props.node
      });
    }
    var targetNode = event.target.nodeName;
    if (props.disabled || targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || utils.DomHandler.hasClass(event.target, 'p-clickable')) {
      return;
    }
    if (props.selectionMode && props.node.selectable !== false) {
      var selectionKeys;
      if (isCheckboxSelectionMode()) {
        var checked = isChecked();
        selectionKeys = props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
        if (checked) {
          if (props.propagateSelectionDown) {
            propagateDown(props.node, false, selectionKeys);
          } else {
            delete selectionKeys[props.node.key];
          }
          if (props.propagateSelectionUp && props.onPropagateUp) {
            props.onPropagateUp({
              originalEvent: event,
              check: false,
              selectionKeys: selectionKeys
            });
          }
          if (props.onUnselect) {
            props.onUnselect({
              originalEvent: event,
              node: props.node
            });
          }
        } else {
          if (props.propagateSelectionDown) {
            propagateDown(props.node, true, selectionKeys);
          } else {
            selectionKeys[props.node.key] = {
              checked: true
            };
          }
          if (props.propagateSelectionUp && props.onPropagateUp) {
            props.onPropagateUp({
              originalEvent: event,
              check: true,
              selectionKeys: selectionKeys
            });
          }
          if (props.onSelect) {
            props.onSelect({
              originalEvent: event,
              node: props.node
            });
          }
        }
      } else {
        var selected = isSelected();
        var metaSelection = nodeTouched.current ? false : props.metaKeySelection;
        if (metaSelection) {
          var metaKey = event.metaKey || event.ctrlKey;
          if (selected && metaKey) {
            if (isSingleSelectionMode()) {
              selectionKeys = null;
            } else {
              selectionKeys = _objectSpread$1({}, props.selectionKeys);
              delete selectionKeys[props.node.key];
            }
            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                node: props.node
              });
            }
          } else {
            if (isSingleSelectionMode()) {
              selectionKeys = props.node.key;
            } else if (isMultipleSelectionMode()) {
              selectionKeys = !metaKey ? {} : props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
              selectionKeys[props.node.key] = true;
            }
            if (props.onSelect) {
              props.onSelect({
                originalEvent: event,
                node: props.node
              });
            }
          }
        } else if (isSingleSelectionMode()) {
          if (selected) {
            selectionKeys = null;
            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                node: props.node
              });
            }
          } else {
            selectionKeys = props.node.key;
            if (props.onSelect) {
              props.onSelect({
                originalEvent: event,
                node: props.node
              });
            }
          }
        } else if (selected) {
          selectionKeys = _objectSpread$1({}, props.selectionKeys);
          delete selectionKeys[props.node.key];
          if (props.onUnselect) {
            props.onUnselect({
              originalEvent: event,
              node: props.node
            });
          }
        } else {
          selectionKeys = props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
          selectionKeys[props.node.key] = true;
          if (props.onSelect) {
            props.onSelect({
              originalEvent: event,
              node: props.node
            });
          }
        }
      }
      if (props.onSelectionChange) {
        props.onSelectionChange({
          originalEvent: event,
          value: selectionKeys
        });
      }
    }
    nodeTouched.current = false;
  };
  var onDoubleClick = function onDoubleClick(event) {
    if (props.onDoubleClick) {
      props.onDoubleClick({
        originalEvent: event,
        node: props.node
      });
    }
  };
  var onRightClick = function onRightClick(event) {
    if (props.disabled) {
      return;
    }
    utils.DomHandler.clearSelection();
    if (props.onContextMenuSelectionChange) {
      props.onContextMenuSelectionChange({
        originalEvent: event,
        value: props.node.key
      });
    }
    if (props.onContextMenu) {
      props.onContextMenu({
        originalEvent: event,
        node: props.node
      });
    }
  };
  var onKeyDown = function onKeyDown(event) {
    if (!isSameNode(event)) {
      return;
    }
    switch (event.code) {
      case 'Tab':
        onTabKey();
        break;
      case 'ArrowDown':
        onArrowDown(event);
        break;
      case 'ArrowUp':
        onArrowUp(event);
        break;
      case 'ArrowRight':
        onArrowRight(event);
        break;
      case 'ArrowLeft':
        onArrowLeft(event);
        break;
      case 'Enter':
      case 'NumpadEnter':
      case 'Space':
        onEnterKey(event);
        break;
    }
  };
  var onArrowDown = function onArrowDown(event) {
    var nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target;
    var listElement = nodeElement.children[1];
    if (listElement) {
      focusRowChange(nodeElement, listElement.children[0]);
    } else if (nodeElement.nextElementSibling) {
      focusRowChange(nodeElement, nodeElement.nextElementSibling);
    } else {
      var nextSiblingAncestor = findNextSiblingOfAncestor(nodeElement);
      if (nextSiblingAncestor) {
        focusRowChange(nodeElement, nextSiblingAncestor);
      }
    }
    event.preventDefault();
  };
  var onArrowUp = function onArrowUp(event) {
    var nodeElement = event.target;
    if (nodeElement.previousElementSibling) {
      focusRowChange(nodeElement, nodeElement.previousElementSibling, findLastVisibleDescendant(nodeElement.previousElementSibling));
    } else {
      var parentNodeElement = getParentNodeElement(nodeElement);
      if (parentNodeElement) {
        focusRowChange(nodeElement, parentNodeElement);
      }
    }
    event.preventDefault();
  };
  var onArrowRight = function onArrowRight(event) {
    if (isLeaf || expanded) {
      return;
    }
    event.currentTarget.tabIndex = -1;
    expand(event, true);
  };
  var onArrowLeft = function onArrowLeft(event) {
    var togglerElement = utils.DomHandler.findSingle(event.currentTarget, '[data-pc-section="toggler"]');
    if (props.level === 0 && !expanded) {
      return false;
    }
    if (expanded && !isLeaf) {
      togglerElement.click();
      return false;
    }
    var target = findBeforeClickableNode(event.currentTarget);
    if (target) {
      focusRowChange(event.currentTarget, target);
    }
  };
  var onEnterKey = function onEnterKey(event) {
    setTabIndexForSelectionMode(event, nodeTouched.current);
    onClick(event);
    event.preventDefault();
  };
  var onTabKey = function onTabKey() {
    setAllNodesTabIndexes();
  };
  var setAllNodesTabIndexes = function setAllNodesTabIndexes() {
    var nodes = utils.DomHandler.find(contentRef.current.closest('[data-pc-section="container"]'), '[role="treeitem"]');
    var hasSelectedNode = _toConsumableArray(nodes).some(function (node) {
      return node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true';
    });
    _toConsumableArray(nodes).forEach(function (node) {
      node.tabIndex = -1;
    });
    if (hasSelectedNode) {
      var selectedNodes = _toConsumableArray(nodes).filter(function (node) {
        return node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true';
      });
      selectedNodes[0].tabIndex = 0;
      return;
    }
    _toConsumableArray(nodes)[0].tabIndex = 0;
  };
  var setTabIndexForSelectionMode = function setTabIndexForSelectionMode(event, nodeTouched) {
    if (props.selectionMode !== null) {
      var elements = _toConsumableArray(utils.DomHandler.find(elementRef.current.parentElement, '[role="treeitem"]'));
      event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;
      if (elements.every(function (element) {
        return element.tabIndex === -1;
      })) {
        elements[0].tabIndex = 0;
      }
    }
  };
  var focusRowChange = function focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant) {
    firstFocusableRow.tabIndex = '-1';
    currentFocusedRow.tabIndex = '0';
    focusNode(lastVisibleDescendant || currentFocusedRow);
  };
  var findBeforeClickableNode = function findBeforeClickableNode(node) {
    var parentListElement = node.closest('ul').closest('li');
    if (parentListElement) {
      var prevNodeButton = utils.DomHandler.findSingle(parentListElement, 'button');
      if (prevNodeButton && prevNodeButton.style.visibility !== 'hidden') {
        return parentListElement;
      }
      return findBeforeClickableNode(node.previousElementSibling);
    }
    return null;
  };
  var propagateUp = function propagateUp(event) {
    var check = event.check;
    var selectionKeys = event.selectionKeys;
    var checkedChildCount = 0;
    var _iterator = _createForOfIteratorHelper$1(props.node.children),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        if (selectionKeys[child.key] && selectionKeys[child.key].checked) {
          checkedChildCount++;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var parentKey = props.node.key;
    var children = utils.ObjectUtils.findChildrenByKey(props.originalOptions, parentKey);
    var isParentPartiallyChecked = children.some(function (ele) {
      return ele.key in selectionKeys;
    });
    var isCompletelyChecked = children.every(function (ele) {
      return ele.key in selectionKeys && selectionKeys[ele.key].checked;
    });
    if (isParentPartiallyChecked && !isCompletelyChecked) {
      selectionKeys[parentKey] = {
        checked: false,
        partialChecked: true
      };
    } else if (isCompletelyChecked) {
      selectionKeys[parentKey] = {
        checked: true,
        partialChecked: false
      };
    } else if (check) {
      selectionKeys[parentKey] = {
        checked: false,
        partialChecked: false
      };
    } else {
      delete selectionKeys[parentKey];
    }
    if (props.propagateSelectionUp && props.onPropagateUp) {
      props.onPropagateUp(event);
    }
  };
  var propagateDown = function propagateDown(node, check, selectionKeys) {
    if (check) {
      selectionKeys[node.key] = {
        checked: true,
        partialChecked: false
      };
    } else {
      delete selectionKeys[node.key];
    }
    if (node.children && node.children.length) {
      for (var i = 0; i < node.children.length; i++) {
        propagateDown(node.children[i], check, selectionKeys);
      }
    }
  };
  var isSelected = function isSelected() {
    if (props.selectionMode && props.selectionKeys) {
      return isSingleSelectionMode() ? props.selectionKeys === props.node.key : props.selectionKeys[props.node.key] !== undefined;
    }
    return false;
  };
  var isChecked = function isChecked() {
    return (props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].checked : false) || false;
  };
  var isSameNode = function isSameNode(event) {
    return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('[role="treeitem"]')));
  };
  var isPartialChecked = function isPartialChecked() {
    return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].partialChecked : false;
  };
  var isSingleSelectionMode = function isSingleSelectionMode() {
    return props.selectionMode && props.selectionMode === 'single';
  };
  var isMultipleSelectionMode = function isMultipleSelectionMode() {
    return props.selectionMode && props.selectionMode === 'multiple';
  };
  var isCheckboxSelectionMode = function isCheckboxSelectionMode() {
    return props.selectionMode && props.selectionMode === 'checkbox';
  };
  var onTouchEnd = function onTouchEnd() {
    nodeTouched.current = true;
  };
  var onDropPoint = function onDropPoint(event, position) {
    event.preventDefault();
    if (props.node.droppable !== false) {
      utils.DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');
      if (props.onDropPoint) {
        var dropIndex = position === -1 ? props.index : props.index + 1;
        props.onDropPoint({
          originalEvent: event,
          path: props.path,
          index: dropIndex,
          position: position
        });
      }
    }
  };
  var onDropPointDragOver = function onDropPointDragOver(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
      event.dataTransfer.dropEffect = 'move';
      event.preventDefault();
    }
  };
  var onDropPointDragEnter = function onDropPointDragEnter(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
      utils.DomHandler.addClass(event.target, 'p-treenode-droppoint-active');
    }
  };
  var onDropPointDragLeave = function onDropPointDragLeave(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
      utils.DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');
    }
  };
  var onDrop = function onDrop(event) {
    if (props.dragdropScope && props.node.droppable !== false) {
      utils.DomHandler.removeClass(contentRef.current, 'p-treenode-dragover');
      event.preventDefault();
      event.stopPropagation();
      if (props.onDrop) {
        props.onDrop({
          originalEvent: event,
          path: props.path,
          index: props.index
        });
      }
    }
  };
  var onDragOver = function onDragOver(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
      event.dataTransfer.dropEffect = 'move';
      event.preventDefault();
      event.stopPropagation();
    }
  };
  var onDragEnter = function onDragEnter(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
      utils.DomHandler.addClass(contentRef.current, 'p-treenode-dragover');
    }
  };
  var onDragLeave = function onDragLeave(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
      var rect = event.currentTarget.getBoundingClientRect();
      if (event.nativeEvent.x > rect.left + rect.width || event.nativeEvent.x < rect.left || event.nativeEvent.y >= Math.floor(rect.top + rect.height) || event.nativeEvent.y < rect.top) {
        utils.DomHandler.removeClass(contentRef.current, 'p-treenode-dragover');
      }
    }
  };
  var onDragStart = function onDragStart(event) {
    event.dataTransfer.setData('text', props.dragdropScope);
    event.dataTransfer.setData(props.dragdropScope, props.dragdropScope);
    if (props.onDragStart) {
      props.onDragStart({
        originalEvent: event,
        path: props.path,
        index: props.index
      });
    }
  };
  var onDragEnd = function onDragEnd(event) {
    if (props.onDragEnd) {
      props.onDragEnd({
        originalEvent: event
      });
    }
  };
  var createLabel = function createLabel() {
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions('label'));
    var content = /*#__PURE__*/React__namespace.createElement("span", labelProps, label);
    if (props.nodeTemplate) {
      var defaultContentOptions = {
        onTogglerClick: onTogglerClick,
        className: 'p-treenode-label',
        element: content,
        props: props,
        expanded: expanded
      };
      content = utils.ObjectUtils.getJSXElement(props.nodeTemplate, props.node, defaultContentOptions);
    }
    return content;
  };
  var createCheckbox = function createCheckbox() {
    if (isCheckboxSelectionMode() && props.node.selectable !== false) {
      var _props$isUnstyled;
      var checked = isChecked();
      var partialChecked = isPartialChecked();
      var checkboxIconProps = mergeProps({
        className: cx('checkIcon')
      });
      var icon = checked ? props.checkboxIcon || /*#__PURE__*/React__namespace.createElement(check.CheckIcon, checkboxIconProps) : partialChecked ? props.checkboxIcon || /*#__PURE__*/React__namespace.createElement(minus.MinusIcon, checkboxIconProps) : null;
      var checkboxIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, checkboxIconProps), props);
      var checkboxProps = mergeProps({
        className: cx('nodeCheckbox', {
          partialChecked: partialChecked
        }),
        checked: checked || partialChecked,
        icon: checkboxIcon,
        tabIndex: -1,
        unstyled: props === null || props === void 0 || (_props$isUnstyled = props.isUnstyled) === null || _props$isUnstyled === void 0 ? void 0 : _props$isUnstyled.call(props),
        'data-p-checked': checked,
        'data-p-partialchecked': partialChecked,
        onChange: onClick
      }, getPTOptions('nodeCheckbox'));
      return /*#__PURE__*/React__namespace.createElement(Checkbox, checkboxProps);
    }
    return null;
  };
  var createIcon = function createIcon() {
    var icon = props.node.icon || (expanded ? props.node.expandedIcon : props.node.collapsedIcon);
    if (icon) {
      var nodeIconProps = mergeProps({
        className: utils.classNames(icon, cx('nodeIcon'))
      }, getPTOptions('nodeIcon'));
      return utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, nodeIconProps), {
        props: props
      });
    }
    return null;
  };
  var createToggler = function createToggler() {
    var togglerIconProps = mergeProps({
      className: cx('togglerIcon'),
      'aria-hidden': true
    }, getPTOptions('togglerIcon'));
    var icon = expanded ? props.collapseIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, togglerIconProps) : props.expandIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, togglerIconProps);
    var togglerIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, togglerIconProps), {
      props: props,
      expanded: expanded
    });
    var togglerProps = mergeProps({
      type: 'button',
      className: cx('toggler'),
      tabIndex: -1,
      'aria-hidden': true,
      onClick: onTogglerClick
    }, getPTOptions('toggler'));
    var content = /*#__PURE__*/React__namespace.createElement("button", togglerProps, togglerIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (props.togglerTemplate) {
      var defaultContentOptions = {
        onClick: onTogglerClick,
        containerClassName: 'p-tree-toggler p-link',
        iconClassName: 'p-tree-toggler-icon',
        element: content,
        props: props,
        expanded: expanded
      };
      content = utils.ObjectUtils.getJSXElement(props.togglerTemplate, props.node, defaultContentOptions);
    }
    return content;
  };
  var createDropPoint = function createDropPoint(position) {
    if (props.dragdropScope) {
      var droppointProps = mergeProps({
        className: cx('droppoint'),
        role: 'treeitem',
        onDrop: function onDrop(event) {
          return onDropPoint(event, position);
        },
        onDragOver: onDropPointDragOver,
        onDragEnter: onDropPointDragEnter,
        onDragLeave: onDropPointDragLeave
      }, getPTOptions('droppoint'));
      return /*#__PURE__*/React__namespace.createElement("li", droppointProps);
    }
    return null;
  };
  var createContent = function createContent() {
    var selected = isSelected();
    var checked = isChecked();
    var toggler = createToggler();
    var checkbox = createCheckbox();
    var icon = createIcon();
    var label = createLabel();
    var contentProps = mergeProps({
      ref: contentRef,
      className: utils.classNames(props.node.className, cx('content', {
        checked: checked,
        selected: selected,
        nodeProps: props,
        isCheckboxSelectionMode: isCheckboxSelectionMode
      })),
      style: props.node.style,
      onClick: onClick,
      onDoubleClick: onDoubleClick,
      onContextMenu: onRightClick,
      onTouchEnd: onTouchEnd,
      draggable: props.dragdropScope && props.node.draggable !== false && !props.disabled,
      onDrop: onDrop,
      onDragOver: onDragOver,
      onDragEnter: onDragEnter,
      onDragLeave: onDragLeave,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      'data-p-highlight': isCheckboxSelectionMode() ? checked : selected
    }, getPTOptions('content'));
    return /*#__PURE__*/React__namespace.createElement("div", contentProps, toggler, checkbox, icon, label);
  };
  var createChildren = function createChildren() {
    var subgroupProps = mergeProps({
      className: cx('subgroup'),
      role: 'group'
    }, getPTOptions('subgroup'));
    if (utils.ObjectUtils.isNotEmpty(props.node.children) && expanded) {
      return /*#__PURE__*/React__namespace.createElement("ul", subgroupProps, props.node.children.map(function (childNode, index) {
        return /*#__PURE__*/React__namespace.createElement(UITreeNode, {
          key: childNode.key || childNode.label,
          node: childNode,
          checkboxIcon: props.checkboxIcon,
          collapseIcon: props.collapseIcon,
          contextMenuSelectionKey: props.contextMenuSelectionKey,
          cx: cx,
          disabled: props.disabled,
          dragdropScope: props.dragdropScope,
          expandIcon: props.expandIcon,
          expandedKeys: props.expandedKeys,
          index: index,
          isNodeLeaf: props.isNodeLeaf,
          last: index === props.node.children.length - 1,
          metaKeySelection: props.metaKeySelection,
          nodeTemplate: props.nodeTemplate,
          onClick: props.onClick,
          onCollapse: props.onCollapse,
          onContextMenu: props.onContextMenu,
          onContextMenuSelectionChange: props.onContextMenuSelectionChange,
          onDoubleClick: props.onDoubleClick,
          onDragEnd: props.onDragEnd,
          onDragStart: props.onDragStart,
          onDrop: props.onDrop,
          onDropPoint: props.onDropPoint,
          onExpand: props.onExpand,
          onPropagateUp: propagateUp,
          onSelect: props.onSelect,
          onSelectionChange: props.onSelectionChange,
          onToggle: props.onToggle,
          onUnselect: props.onUnselect,
          originalOptions: props.originalOptions,
          parent: props.node,
          path: props.path + '-' + index,
          propagateSelectionDown: props.propagateSelectionDown,
          propagateSelectionUp: props.propagateSelectionUp,
          ptm: ptm,
          selectionKeys: props.selectionKeys,
          selectionMode: props.selectionMode,
          togglerTemplate: props.togglerTemplate
        });
      }));
    }
    return null;
  };
  var createNode = function createNode() {
    var tabIndex = props.disabled || props.index !== 0 ? -1 : 0;
    var selected = isSelected();
    var checked = isChecked();
    var content = createContent();
    var children = createChildren();
    var nodeProps = mergeProps(_defineProperty(_defineProperty({
      ref: elementRef,
      className: utils.classNames(props.node.className, cx('node', {
        isLeaf: isLeaf
      })),
      style: props.node.style,
      tabIndex: tabIndex,
      role: 'treeitem',
      'aria-label': label,
      'aria-level': props.level,
      'aria-expanded': expanded,
      'aria-checked': checked,
      'aria-setsize': props.node.children ? props.node.children.length : 0,
      'aria-posinset': props.index + 1,
      onKeyDown: onKeyDown
    }, "aria-expanded", expanded), 'aria-selected', checked || selected), getPTOptions('node'));
    return /*#__PURE__*/React__namespace.createElement("li", nodeProps, content, children);
  };
  var node = createNode();
  if (props.dragdropScope && !props.disabled) {
    var beforeDropPoint = createDropPoint(-1);
    var afterDropPoint = props.last ? createDropPoint(1) : null;
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, beforeDropPoint, node, afterDropPoint);
  }
  return node;
});
UITreeNode.displayName = 'UITreeNode';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var Tree = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = TreeBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filterValueState = _React$useState2[0],
    setFilterValueState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(props.expandedKeys),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    expandedKeysState = _React$useState4[0],
    setExpandedKeysState = _React$useState4[1];
  var elementRef = React__namespace.useRef(null);
  var filteredNodes = React__namespace.useRef([]);
  var dragState = React__namespace.useRef(null);
  var filterChanged = React__namespace.useRef(false);
  var filteredValue = props.onFilterValueChange ? props.filterValue : filterValueState;
  var expandedKeys = props.onToggle ? props.expandedKeys : expandedKeysState;
  var childFocusEvent = React__namespace.useRef(null);
  var _TreeBase$setMetaData = TreeBase.setMetaData({
      props: props,
      state: {
        filterValue: filteredValue,
        expandedKeys: expandedKeys
      }
    }),
    ptm = _TreeBase$setMetaData.ptm,
    cx = _TreeBase$setMetaData.cx,
    isUnstyled = _TreeBase$setMetaData.isUnstyled;
  componentbase.useHandleStyle(TreeBase.css.styles, isUnstyled, {
    name: 'tree'
  });
  var filterOptions = {
    filter: function filter(e) {
      return onFilterInputChange(e);
    },
    reset: function reset() {
      return resetFilter();
    }
  };
  var getRootNode = function getRootNode() {
    return props.filter && filteredNodes.current ? filteredNodes.current : props.value;
  };
  var onToggle = function onToggle(event) {
    var originalEvent = event.originalEvent,
      value = event.value,
      navigateFocusToChild = event.navigateFocusToChild;
    if (props.onToggle) {
      props.onToggle({
        originalEvent: originalEvent,
        value: value
      });
    } else {
      if (navigateFocusToChild) {
        childFocusEvent.current = originalEvent;
      }
      setExpandedKeysState(value);
    }
  };
  useUpdateEffect(function () {
    if (childFocusEvent.current) {
      var event = childFocusEvent.current;
      var nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target;
      var listElement = nodeElement.children[1];
      if (listElement) {
        if (nodeElement) {
          nodeElement.tabIndex = '-1';
        }
        var childElement = listElement.children[0];
        if (childElement) {
          childElement.tabIndex = '0';
          childElement.focus();
        }
      }
      childFocusEvent.current = null;
    }
  }, [expandedKeys]);
  var onDragStart = function onDragStart(event) {
    dragState.current = {
      path: event.path,
      index: event.index
    };
  };
  var onDragEnd = function onDragEnd() {
    dragState.current = null;
  };

  /**
   * Deep copy a value. If the value has a data property, it will be shallow copied.
   * Values that are not plain objects or arrays are returned as-is.
   */
  var cloneValue = function cloneValue(value) {
    if (Array.isArray(value)) {
      return value.map(cloneValue);
    } else if (!!value && Object.getPrototypeOf(value) === Object.prototype) {
      var result = {};

      // Leave data property alone and clone children
      for (var key in value) {
        if (key !== 'data') {
          result[key] = cloneValue(value[key]);
        } else {
          result[key] = value[key];
        }
      }
      return result;
    }
    return value;
  };
  var onDrop = function onDrop(event) {
    var _dragState$current;
    if (validateDropNode((_dragState$current = dragState.current) === null || _dragState$current === void 0 ? void 0 : _dragState$current.path, event.path)) {
      var value = cloneValue(props.value);
      var dragPaths = dragState.current.path.split('-');
      dragPaths.pop();
      var dragNodeParent = findNode(value, dragPaths);
      var dragNode = dragNodeParent ? dragNodeParent.children[dragState.current.index] : value[dragState.current.index];
      var dropNode = findNode(value, event.path.split('-'));
      if (dropNode.children) {
        dropNode.children.push(dragNode);
      } else {
        dropNode.children = [dragNode];
      }
      if (dragNodeParent) {
        dragNodeParent.children.splice(dragState.current.index, 1);
      } else {
        value.splice(dragState.current.index, 1);
      }
      if (props.onDragDrop) {
        props.onDragDrop({
          originalEvent: event.originalEvent,
          value: value,
          dragNode: dragNode,
          dropNode: dropNode,
          dropIndex: event.index
        });
      }
    }
  };
  var onDropPoint = function onDropPoint(event) {
    if (validateDropPoint(event)) {
      var value = cloneValue(props.value);
      var dragPaths = dragState.current.path.split('-');
      dragPaths.pop();
      var dropPaths = event.path.split('-');
      dropPaths.pop();
      var dragNodeParent = findNode(value, dragPaths);
      var dropNodeParent = findNode(value, dropPaths);
      var dragNode = dragNodeParent ? dragNodeParent.children[dragState.current.index] : value[dragState.current.index];
      var siblings = areSiblings(dragState.current.path, event.path);
      if (dragNodeParent) {
        dragNodeParent.children.splice(dragState.current.index, 1);
      } else {
        value.splice(dragState.current.index, 1);
      }
      if (event.position < 0) {
        var dropIndex = siblings ? dragState.current.index > event.index ? event.index : event.index - 1 : event.index;
        if (dropNodeParent) {
          dropNodeParent.children.splice(dropIndex, 0, dragNode);
        } else {
          value.splice(dropIndex, 0, dragNode);
        }
      } else if (dropNodeParent) {
        dropNodeParent.children.push(dragNode);
      } else {
        value.push(dragNode);
      }
      if (props.onDragDrop) {
        props.onDragDrop({
          originalEvent: event.originalEvent,
          value: value,
          dragNode: dragNode,
          dropNode: dropNodeParent,
          dropIndex: event.index
        });
      }
    }
  };
  var validateDrop = function validateDrop(dragPath, dropPath) {
    if (!dragPath) {
      return false;
    }

    //same node
    if (dragPath === dropPath) {
      return false;
    }

    //parent dropped on an descendant
    if (dropPath.indexOf(dragPath) === 0) {
      return false;
    }
    return true;
  };
  var validateDropNode = function validateDropNode(dragPath, dropPath) {
    var _validateDrop = validateDrop(dragPath, dropPath);
    if (_validateDrop) {
      //child dropped on parent
      if (dragPath.indexOf('-') > 0 && dragPath.substring(0, dragPath.lastIndexOf('-')) === dropPath) {
        return false;
      }
      return true;
    }
    return false;
  };
  var validateDropPoint = function validateDropPoint(event) {
    var _dragState$current2;
    var _validateDrop = validateDrop((_dragState$current2 = dragState.current) === null || _dragState$current2 === void 0 ? void 0 : _dragState$current2.path, event.path);
    if (_validateDrop) {
      //child dropped to next sibling's drop point
      if (event.position === -1 && areSiblings(dragState.current.path, event.path) && dragState.current.index + 1 === event.index) {
        return false;
      }
      return true;
    }
    return false;
  };
  var areSiblings = function areSiblings(path1, path2) {
    if (path1.length === 1 && path2.length === 1) {
      return true;
    }
    return path1.substring(0, path1.lastIndexOf('-')) === path2.substring(0, path2.lastIndexOf('-'));
  };
  var findNode = function findNode(value, path) {
    if (path.length === 0) {
      return null;
    }
    var index = parseInt(path[0], 10);
    var nextSearchRoot = value.children ? value.children[index] : value[index];
    if (path.length === 1) {
      return nextSearchRoot;
    }
    path.shift();
    return findNode(nextSearchRoot, path);
  };
  var isNodeLeaf = function isNodeLeaf(node) {
    return node.leaf === false ? false : !(node.children && node.children.length);
  };
  var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
    //enter
    if (event.which === 13) {
      event.preventDefault();
    }
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    filterChanged.current = true;
    var value = event.target.value;
    if (props.onFilterValueChange) {
      props.onFilterValueChange({
        originalEvent: event,
        value: value
      });
    } else {
      setFilterValueState(value);
    }
  };
  var filter = function filter(value) {
    setFilterValueState(utils.ObjectUtils.isNotEmpty(value) ? value : '');
    _filter();
  };
  var _filter = function _filter() {
    if (!filterChanged.current) {
      return;
    }
    if (utils.ObjectUtils.isEmpty(filteredValue)) {
      filteredNodes.current = props.value;
    } else {
      filteredNodes.current = [];
      var searchFields = props.filterBy.split(',');
      var filterText = filteredValue.toLocaleLowerCase(props.filterLocale);
      var isStrictMode = props.filterMode === 'strict';
      var _iterator = _createForOfIteratorHelper(props.value),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          var copyNode = _objectSpread({}, node);
          var paramsWithoutNode = {
            searchFields: searchFields,
            filterText: filterText,
            isStrictMode: isStrictMode
          };
          if (isStrictMode && (findFilteredNodes(copyNode, paramsWithoutNode) || isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && (isFilterMatched(copyNode, paramsWithoutNode) || findFilteredNodes(copyNode, paramsWithoutNode))) {
            filteredNodes.current.push(copyNode);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    filterChanged.current = false;
  };
  var findFilteredNodes = function findFilteredNodes(node, paramsWithoutNode) {
    if (node) {
      var matched = false;
      if (node.children) {
        var childNodes = _toConsumableArray(node.children);
        node.children = [];
        var _iterator2 = _createForOfIteratorHelper(childNodes),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var childNode = _step2.value;
            var copyChildNode = _objectSpread({}, childNode);
            if (isFilterMatched(copyChildNode, paramsWithoutNode)) {
              matched = true;
              node.children.push(copyChildNode);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      if (matched) {
        node.expanded = true;
        return true;
      }
    }
  };
  var isFilterMatched = function isFilterMatched(node, _ref) {
    var searchFields = _ref.searchFields,
      filterText = _ref.filterText,
      isStrictMode = _ref.isStrictMode;
    var matched = false;
    var _iterator3 = _createForOfIteratorHelper(searchFields),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var field = _step3.value;
        var fieldValue = String(utils.ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(props.filterLocale);
        if (fieldValue.indexOf(filterText) > -1) {
          matched = true;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (!matched || isStrictMode && !isNodeLeaf(node)) {
      matched = findFilteredNodes(node, {
        searchFields: searchFields,
        filterText: filterText,
        isStrictMode: isStrictMode
      }) || matched;
    }
    return matched;
  };
  var resetFilter = function resetFilter() {
    setFilterValueState('');
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      filter: filter,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var createRootChild = function createRootChild(node, index, last) {
    return /*#__PURE__*/React__namespace.createElement(UITreeNode, {
      hostName: "Tree",
      key: node.key || node.label,
      node: node,
      level: props.level + 1,
      originalOptions: props.value,
      index: index,
      last: last,
      path: String(index),
      checkboxIcon: props.checkboxIcon,
      collapseIcon: props.collapseIcon,
      contextMenuSelectionKey: props.contextMenuSelectionKey,
      cx: cx,
      disabled: props.disabled,
      dragdropScope: props.dragdropScope,
      expandIcon: props.expandIcon,
      expandedKeys: expandedKeys,
      isNodeLeaf: isNodeLeaf,
      metaKeySelection: props.metaKeySelection,
      nodeTemplate: props.nodeTemplate,
      onClick: props.onNodeClick,
      onCollapse: props.onCollapse,
      onContextMenu: props.onContextMenu,
      onContextMenuSelectionChange: props.onContextMenuSelectionChange,
      onDoubleClick: props.onNodeDoubleClick,
      onDragEnd: onDragEnd,
      onDragStart: onDragStart,
      onDrop: onDrop,
      onDropPoint: onDropPoint,
      onExpand: props.onExpand,
      onSelect: props.onSelect,
      onSelectionChange: props.onSelectionChange,
      onToggle: onToggle,
      onUnselect: props.onUnselect,
      propagateSelectionDown: props.propagateSelectionDown,
      propagateSelectionUp: props.propagateSelectionUp,
      ptm: ptm,
      selectionKeys: props.selectionKeys,
      selectionMode: props.selectionMode,
      togglerTemplate: props.togglerTemplate,
      isUnstyled: isUnstyled
    });
  };
  var createEmptyMessageNode = function createEmptyMessageNode() {
    var emptyMessageProps = mergeProps({
      className: utils.classNames(props.contentClassName, cx('emptyMessage')),
      role: 'treeitem'
    }, ptm('emptyMessage'));
    var message = utils.ObjectUtils.getJSXElement(props.emptyMessage, props) || api.localeOption('emptyMessage');
    return /*#__PURE__*/React__namespace.createElement("li", emptyMessageProps, /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-treenode-content"
    }, message));
  };
  var createRootChildrenContainer = function createRootChildrenContainer(children) {
    var containerProps = mergeProps(_objectSpread({
      className: utils.classNames(props.contentClassName, cx('container')),
      role: 'tree',
      'aria-label': props.ariaLabel,
      'aria-labelledby': props.ariaLabelledBy,
      style: props.contentStyle
    }, ariaProps), ptm('container'));
    return /*#__PURE__*/React__namespace.createElement("ul", containerProps, children);
  };
  var createRootChildren = function createRootChildren(value) {
    return value.map(function (node, index) {
      return createRootChild(node, index, index === value.length - 1);
    });
  };
  var createModel = function createModel() {
    if (props.value) {
      if (props.filter) {
        filterChanged.current = true;
        _filter();
      }
      var value = getRootNode();
      if (value.length > 0) {
        var rootNodes = createRootChildren(value);
        return createRootChildrenContainer(rootNodes);
      }
      var emptyMessageNode = createEmptyMessageNode();
      return createRootChildrenContainer(emptyMessageNode);
    }
    return null;
  };
  var createLoader = function createLoader() {
    if (props.loading) {
      var loadingIconProps = mergeProps({
        className: cx('loadingIcon')
      }, ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, _extends({}, loadingIconProps, {
        spin: true
      }));
      var loadingIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      var loadingOverlayProps = mergeProps({
        className: cx('loadingOverlay')
      }, ptm('loadingOverlay'));
      return /*#__PURE__*/React__namespace.createElement("div", loadingOverlayProps, loadingIcon);
    }
    return null;
  };
  var createFilter = function createFilter() {
    if (props.filter) {
      var value = utils.ObjectUtils.isNotEmpty(filteredValue) ? filteredValue : '';
      var searchIconProps = mergeProps({
        className: cx('searchIcon')
      }, ptm('searchIcon'));
      var icon = props.filterIcon || /*#__PURE__*/React__namespace.createElement(search.SearchIcon, searchIconProps);
      var filterIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, searchIconProps), {
        props: props
      });
      var filterContainerProps = mergeProps({
        className: cx('filterContainer')
      }, ptm('filterContainer'));
      var inputProps = mergeProps({
        type: 'text',
        value: value,
        autoComplete: 'off',
        className: cx('input'),
        placeholder: props.filterPlaceholder,
        'aria-label': props.filterPlaceholder,
        onKeyDown: onFilterInputKeyDown,
        onChange: onFilterInputChange,
        disabled: props.disabled
      }, ptm('input'));
      var _content = /*#__PURE__*/React__namespace.createElement("div", filterContainerProps, /*#__PURE__*/React__namespace.createElement("input", inputProps), filterIcon);
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-tree-filter-container',
          element: _content,
          filterOptions: filterOptions,
          filterInputKeyDown: onFilterInputKeyDown,
          filterInputChange: onFilterInputChange,
          filterIconClassName: 'p-dropdown-filter-icon',
          props: props
        };
        _content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, _content);
    }
    return null;
  };
  var createHeader = function createHeader() {
    if (props.showHeader) {
      var filterElement = createFilter();
      var _content2 = filterElement;
      if (props.header) {
        var defaultContentOptions = {
          filterContainerClassName: 'p-tree-filter-container',
          filterIconClassName: 'p-tree-filter-icon',
          filterInput: {
            className: 'p-tree-filter p-inputtext p-component',
            onKeyDown: onFilterInputKeyDown,
            onChange: onFilterInputChange
          },
          filterElement: filterElement,
          element: _content2,
          props: props
        };
        _content2 = utils.ObjectUtils.getJSXElement(props.header, defaultContentOptions);
      }
      var headerProps = mergeProps({
        className: cx('header')
      }, ptm('header'));
      return /*#__PURE__*/React__namespace.createElement("div", headerProps, _content2);
    }
    return null;
  };
  var createFooter = function createFooter() {
    var content = utils.ObjectUtils.getJSXElement(props.footer, props);
    var footerProps = mergeProps({
      className: cx('footer')
    }, ptm('footer'));
    return /*#__PURE__*/React__namespace.createElement("div", footerProps, content);
  };
  var otherProps = TreeBase.getOtherProps(props);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var loader = createLoader();
  var content = createModel();
  var header = createHeader();
  var footer = createFooter();
  var rootProps = mergeProps({
    ref: elementRef,
    className: utils.classNames(props.className, cx('root')),
    style: props.style,
    id: props.id
  }, TreeBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, loader, header, content, footer);
}));
Tree.displayName = 'Tree';

exports.Tree = Tree;
