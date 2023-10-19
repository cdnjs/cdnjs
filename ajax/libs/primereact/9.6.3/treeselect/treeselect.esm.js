import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { useOverlayListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { SearchIcon } from 'primereact/icons/search';
import { TimesIcon } from 'primereact/icons/times';
import { OverlayService } from 'primereact/overlayservice';
import { Ripple } from 'primereact/ripple';
import { Tree } from 'primereact/tree';
import { classNames, mergeProps, ObjectUtils, DomHandler, ZIndexUtils, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { Portal } from 'primereact/portal';

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

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

var TreeSelectBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TreeSelect',
    appendTo: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    className: null,
    closeIcon: null,
    disabled: false,
    display: 'comma',
    dropdownIcon: null,
    emptyMessage: null,
    expandedKeys: null,
    filter: false,
    filterBy: 'label',
    filterIcon: null,
    filterInputAutoFocus: true,
    filterLocale: undefined,
    filterMode: 'lenient',
    filterPlaceholder: null,
    filterTemplate: null,
    filterValue: null,
    inputId: null,
    inputRef: null,
    metaKeySelection: true,
    name: null,
    nodeTemplate: null,
    onChange: null,
    onFilterValueChange: null,
    onHide: null,
    onNodeCollapse: null,
    onNodeExpand: null,
    onNodeSelect: null,
    onNodeUnselect: null,
    onShow: null,
    options: null,
    panelClassName: null,
    panelFooterTemplate: null,
    panelHeaderTemplate: null,
    panelStyle: null,
    placeholder: null,
    resetFilterOnHide: false,
    scrollHeight: '400px',
    selectionMode: 'single',
    style: null,
    tabIndex: null,
    togglerTemplate: null,
    transitionOptions: null,
    value: null,
    valueTemplate: null,
    children: undefined
  }
});

var TreeSelectPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var context = React.useContext(PrimeReactContext);
  var createElement = function createElement() {
    var wrapperStyle = {
      maxHeight: props.scrollHeight || 'auto'
    };
    var className = classNames('p-treeselect-panel p-component', props.panelClassName, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
    var panelProps = mergeProps({
      ref: ref,
      className: className,
      style: props.panelStyle,
      onClick: props.onClick
    }, props.ptm('panel'));
    var wrapperProps = mergeProps({
      className: 'p-treeselect-items-wrapper',
      style: wrapperStyle
    }, props.ptm('wrapper'));
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: ref,
      classNames: "p-connected-overlay",
      "in": props["in"],
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: props.onEnter,
      onEntering: props.onEntering,
      onEntered: props.onEntered,
      onExit: props.onExit,
      onExited: props.onExited
    }, /*#__PURE__*/React.createElement("div", panelProps, props.header, /*#__PURE__*/React.createElement("div", wrapperProps, props.children), props.footer));
  };
  var element = createElement();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
});
TreeSelectPanel.displayName = 'TreeSelectPanel';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var TreeSelect = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = TreeSelectBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    overlayVisibleState = _React$useState4[0],
    setOverlayVisibleState = _React$useState4[1];
  var _React$useState5 = React.useState(props.expandedKeys),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    expandedKeysState = _React$useState6[0],
    setExpandedKeysState = _React$useState6[1];
  var _React$useState7 = React.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    filterValueState = _React$useState8[0],
    setFilterValueState = _React$useState8[1];
  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var filterInputRef = React.useRef(null);
  var focusInputRef = React.useRef(props.inputRef);
  var triggerRef = React.useRef(null);
  var selfChange = React.useRef(null);
  var expandedKeys = props.onToggle ? props.expandedKeys : expandedKeysState;
  var filteredValue = props.onFilterValueChange ? props.filterValue : filterValueState;
  var isValueEmpty = ObjectUtils.isEmpty(props.value);
  var hasNoOptions = ObjectUtils.isEmpty(props.options);
  var isSingleSelectionMode = props.selectionMode === 'single';
  var isCheckboxSelectionMode = props.selectionMode === 'checkbox';
  var _TreeSelectBase$setMe = TreeSelectBase.setMetaData({
      props: props,
      state: {
        focused: focusedState,
        overlayVisible: overlayVisibleState,
        expandedKeys: expandedKeys,
        filterValue: filteredValue
      }
    }),
    ptm = _TreeSelectBase$setMe.ptm;
  var filterOptions = {
    filter: function filter(e) {
      return onFilterInputChange(e);
    },
    reset: function reset() {
      return resetFilter();
    }
  };
  var _useOverlayListener = useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var valid = _ref.valid;
        valid && hide();
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var getLabel = function getLabel() {
    return selectedNodes.length ? selectedNodes.map(function (node) {
      return node.label;
    }).join(', ') : props.placeholder;
  };
  var show = function show() {
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
  };
  var onInputFocus = function onInputFocus() {
    setFocusedState(true);
  };
  var onInputBlur = function onInputBlur() {
    setFocusedState(false);
  };
  var onClick = function onClick(event) {
    if (!props.disabled && (!overlayRef.current || !overlayRef.current.contains(event.target)) && !DomHandler.hasClass(event.target, 'p-treeselect-close')) {
      DomHandler.focus(focusInputRef.current);
      overlayVisibleState ? hide() : show();
    }
  };
  var onSelectionChange = function onSelectionChange(event) {
    if (props.onChange) {
      selfChange.current = true;
      props.onChange({
        originalEvent: event.originalEvent,
        value: event.value,
        stopPropagation: function stopPropagation() {
          event.originalEvent.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.originalEvent.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: event.value
        }
      });
    }
  };
  var onNodeSelect = function onNodeSelect(node) {
    props.onNodeSelect && props.onNodeSelect(node);
    isSingleSelectionMode && hide();
  };
  var onNodeUnselect = function onNodeUnselect(node) {
    props.onNodeUnselect && props.onNodeUnselect(node);
  };
  var onNodeToggle = function onNodeToggle(e) {
    if (props.onToggle) {
      props.onToggle(e);
    } else {
      setExpandedKeysState(e.value);
    }
  };
  var onFilterValueChange = function onFilterValueChange(e) {
    setFilterValueState(e.value);
  };
  var onOverlayClick = function onOverlayClick(event) {
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };
  var onInputKeyDown = function onInputKeyDown(event) {
    switch (event.which) {
      //down
      case 40:
        if (!overlayVisibleState && event.altKey) {
          show();
        }
        break;

      //space
      case 32:
        if (!overlayVisibleState) {
          show();
          event.preventDefault();
        }
        break;

      //enter and escape
      case 13:
      case 27:
        if (overlayVisibleState) {
          hide();
          event.preventDefault();
        }
        break;

      //tab
      case 9:
        hide();
        break;
    }
  };
  var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
    //enter
    if (event.which === 13) {
      event.preventDefault();
    }
  };
  var onFilterInputChange = function onFilterInputChange(event) {
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
  var resetFilter = function resetFilter() {
    setFilterValueState('');
  };
  var onOverlayEnter = function onOverlayEnter() {
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['overlay'] || PrimeReact.zIndex['overlay']);
    alignOverlay();
    scrollInView();
  };
  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
    if (props.filter && props.filterInputAutoFocus) {
      DomHandler.focus(filterInputRef.current, props.filterInputAutoFocus);
    }
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    if (props.filter && props.resetFilterOnHide) {
      resetFilter();
    }
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var alignOverlay = function alignOverlay() {
    DomHandler.alignOverlay(overlayRef.current, triggerRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact.appendTo);
  };
  var scrollInView = function scrollInView() {
    var highlightItem = DomHandler.findSingle(overlayRef.current, '.p-treenode-content.p-highlight');
    if (highlightItem && highlightItem.scrollIntoView) {
      highlightItem.scrollIntoView({
        block: 'nearest',
        inline: 'start'
      });
    }
  };
  var findSelectedNodes = function findSelectedNodes(node, keys, selectedNodes) {
    if (node) {
      if (isSelected(node, keys)) {
        selectedNodes.push(node);
        delete keys[node.key];
      }
      if (Object.keys(keys).length && node.children) {
        var _iterator = _createForOfIteratorHelper(node.children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var childNode = _step.value;
            findSelectedNodes(childNode, keys, selectedNodes);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    } else {
      var _iterator2 = _createForOfIteratorHelper(props.options),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _childNode = _step2.value;
          findSelectedNodes(_childNode, keys, selectedNodes);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  };
  var isSelected = function isSelected(node, keys) {
    return isCheckboxSelectionMode ? keys[node.key] && keys[node.key].checked : keys[node.key];
  };
  var updateTreeState = function updateTreeState() {
    var keys = isSingleSelectionMode ? _defineProperty({}, "".concat(props.value), true) : _objectSpread({}, props.value);
    setExpandedKeysState({});
    if (keys && props.options) {
      updateTreeBranchState(null, null, keys);
    }
  };
  var updateTreeBranchState = function updateTreeBranchState(node, path, keys) {
    if (node) {
      if (isSelected(node, keys)) {
        expandPath(path);
        delete keys[node.key];
      }
      if (Object.keys(keys).length && node.children) {
        var _iterator3 = _createForOfIteratorHelper(node.children),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var childNode = _step3.value;
            path.push(node.key);
            updateTreeBranchState(childNode, path, keys);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    } else {
      var _iterator4 = _createForOfIteratorHelper(props.options),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _childNode2 = _step4.value;
          updateTreeBranchState(_childNode2, [], keys);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  };
  var expandPath = function expandPath(path) {
    if (path.length > 0) {
      var _expandedKeys = _objectSpread({}, expandedKeysState || {});
      var _iterator5 = _createForOfIteratorHelper(path),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var key = _step5.value;
          _expandedKeys[key] = true;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      setExpandedKeysState(_expandedKeys);
    }
  };
  var getSelectedNodes = function getSelectedNodes() {
    var selectedNodes = [];
    if (ObjectUtils.isNotEmpty(props.value) && props.options) {
      var keys = isSingleSelectionMode ? _defineProperty({}, "".concat(props.value), true) : _objectSpread({}, props.value);
      findSelectedNodes(null, keys, selectedNodes);
    }
    return selectedNodes;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focus(focusInputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(focusInputRef, props.inputRef);
  }, [focusInputRef, props.inputRef]);
  useMountEffect(function () {
    updateTreeState();
    if (props.autoFocus) {
      DomHandler.focus(focusInputRef.current, props.autoFocus);
    }
  });
  useUpdateEffect(function () {
    if (overlayVisibleState && props.filter) {
      alignOverlay();
    }
  });
  useUpdateEffect(function () {
    updateTreeState();
  }, [props.options]);
  useUpdateEffect(function () {
    if (overlayVisibleState && expandedKeysState) {
      alignOverlay();
    }
  }, [expandedKeysState]);
  useUpdateEffect(function () {
    if (overlayVisibleState) {
      if (!selfChange.current) {
        updateTreeState();
      }
      selfChange.current = false;
    }
  }, [props.value]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });
  var createKeyboardHelper = function createKeyboardHelper() {
    var hiddenInputWrapperProps = mergeProps({
      className: 'p-hidden-accessible'
    }, ptm('hiddenInputWrapper'));
    var hiddenInputProps = mergeProps(_objectSpread({
      ref: focusInputRef,
      role: 'listbox',
      id: props.inputId,
      type: 'text',
      'aria-expanded': overlayVisibleState,
      onFocus: onInputFocus,
      onBlur: onInputBlur,
      onKeyDown: onInputKeyDown,
      disabled: props.disabled,
      tabIndex: props.tabIndex
    }, ariaProps), ptm('hiddenInput'));
    return /*#__PURE__*/React.createElement("div", hiddenInputWrapperProps, /*#__PURE__*/React.createElement("input", _extends({}, hiddenInputProps, {
      readOnly: true
    })));
  };
  var createLabel = function createLabel() {
    var labelClassName = classNames('p-treeselect-label', {
      'p-placeholder': getLabel() === props.placeholder,
      'p-treeselect-label-empty': !props.placeholder && isValueEmpty
    });
    var tokenProps = mergeProps({
      className: 'p-treeselect-token'
    }, ptm('token'));
    var tokenLabelProps = mergeProps({
      className: 'p-treeselect-token-label'
    }, ptm('tokenLabel'));
    var labelContainerProps = mergeProps({
      className: 'p-treeselect-label-container'
    }, ptm('labelContainer'));
    var labelProps = mergeProps({
      className: labelClassName
    }, ptm('label'));
    var content = null;
    if (props.valueTemplate) {
      content = ObjectUtils.getJSXElement(props.valueTemplate, selectedNodes, props);
    } else {
      if (props.display === 'comma') {
        content = getLabel() || 'empty';
      } else if (props.display === 'chip') {
        content = /*#__PURE__*/React.createElement(React.Fragment, null, selectedNodes && selectedNodes.map(function (node, index) {
          return /*#__PURE__*/React.createElement("div", _extends({}, tokenProps, {
            key: "".concat(node.key, "_").concat(index)
          }), /*#__PURE__*/React.createElement("span", tokenLabelProps, node.label));
        }), isValueEmpty && (props.placeholder || 'empty'));
      }
    }
    return /*#__PURE__*/React.createElement("div", labelContainerProps, /*#__PURE__*/React.createElement("div", labelProps, content));
  };
  var createDropdownIcon = function createDropdownIcon() {
    var triggerProps = mergeProps({
      ref: triggerRef,
      className: 'p-treeselect-trigger',
      role: 'button',
      'aria-haspopup': 'listbox',
      'aria-expanded': overlayVisibleState
    }, ptm('trigger'));
    var iconClassName = 'p-treeselect-trigger-icon p-clickable';
    var triggerIconProps = mergeProps({
      className: iconClassName
    }, ptm('triggerIcon'));
    var icon = props.dropdownIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, triggerIconProps);
    var dropdownIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, triggerIconProps), {
      props: props
    });
    return /*#__PURE__*/React.createElement("div", triggerProps, dropdownIcon);
  };
  var createContent = function createContent() {
    var emptyMessageProps = mergeProps({
      className: 'p-treeselect-empty-message'
    }, ptm('emptyMessage'));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tree, {
      expandedKeys: expandedKeys,
      filter: props.filter,
      filterBy: props.filterBy,
      filterLocale: props.filterLocale,
      filterMode: props.filterMode,
      filterPlaceholder: props.filterPlaceholder,
      filterValue: filteredValue,
      metaKeySelection: props.metaKeySelection,
      nodeTemplate: props.nodeTemplate,
      onCollapse: props.onNodeCollapse,
      onExpand: props.onNodeExpand,
      onFilterValueChange: onFilterValueChange,
      onSelect: onNodeSelect,
      onSelectionChange: onSelectionChange,
      onToggle: onNodeToggle,
      onUnselect: onNodeUnselect,
      selectionKeys: props.value,
      selectionMode: props.selectionMode,
      showHeader: false,
      togglerTemplate: props.togglerTemplate,
      value: props.options,
      pt: ptm('tree')
    }), hasNoOptions && /*#__PURE__*/React.createElement("div", emptyMessageProps, props.emptyMessage || localeOption('emptyMessage')));
  };
  var createFilterElement = function createFilterElement() {
    if (props.filter) {
      var filterValue = ObjectUtils.isNotEmpty(filteredValue) ? filteredValue : '';
      var filterContainerProps = mergeProps({
        className: 'p-treeselect-filter-container'
      }, ptm('filterContainer'));
      var filterProps = mergeProps({
        ref: filterInputRef,
        type: 'text',
        value: filterValue,
        autoComplete: 'off',
        className: 'p-treeselect-filter p-inputtext p-component',
        placeholder: props.filterPlaceholder,
        onKeyDown: onFilterInputKeyDown,
        onChange: onFilterInputChange,
        disabled: props.disabled
      }, ptm('filter'));
      var iconClassName = 'p-treeselect-filter-icon';
      var filterIconProps = mergeProps({
        className: iconClassName
      }, ptm('filterIcon'));
      var icon = props.filterIcon || /*#__PURE__*/React.createElement(SearchIcon, filterIconProps);
      var filterIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, filterIconProps), {
        props: props
      });
      var filterContent = /*#__PURE__*/React.createElement("div", filterContainerProps, /*#__PURE__*/React.createElement("input", filterProps), filterIcon);
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-treeselect-filter-container',
          element: filterContent,
          filterOptions: filterOptions,
          filterInputKeyDown: onFilterInputKeyDown,
          filterInputChange: onFilterInputChange,
          filterIconClassName: 'p-dropdown-filter-icon',
          props: props
        };
        filterContent = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, filterContent);
    }
  };
  var createHeader = function createHeader() {
    var filterElement = createFilterElement();
    var iconProps = {
      className: 'p-treeselect-close-icon',
      'aria-hidden': true
    };
    var headerIconProps = mergeProps({
      className: iconProps
    }, ptm('headerIcon'));
    var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, headerIconProps);
    var closeIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, headerIconProps), {
      props: props
    });
    var closeButtonProps = mergeProps({
      type: 'button',
      className: 'p-treeselect-close p-link',
      onClick: hide,
      'aria-label': localeOption('close')
    }, ptm('closeButton'));
    var headerProps = mergeProps({
      className: 'p-treeselect-header'
    }, ptm('header'));
    var closeElement = /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React.createElement(Ripple, null));
    var content = /*#__PURE__*/React.createElement("div", headerProps, filterElement, closeElement);
    if (props.panelHeaderTemplate) {
      var defaultOptions = {
        className: 'p-treeselect-header',
        filterElement: filterElement,
        closeElement: closeElement,
        closeElementClassName: 'p-treeselect-close p-link',
        closeIconClassName: 'p-treeselect-close-icon',
        onCloseClick: hide,
        element: content,
        props: props
      };
      return ObjectUtils.getJSXElement(props.panelHeaderTemplate, defaultOptions);
    }
    return content;
  };
  var createFooter = function createFooter() {
    return ObjectUtils.getJSXElement(props.panelFooterTemplate, props);
  };
  var selectedNodes = getSelectedNodes();
  var otherProps = TreeSelectBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-treeselect p-component p-inputwrapper', {
    'p-treeselect-chip': props.display === 'chip',
    'p-disabled': props.disabled,
    'p-focus': focusedState,
    'p-inputwrapper-filled': !isValueEmpty,
    'p-inputwrapper-focus': focusedState || overlayVisibleState
  }, props.className);
  var rootProps = mergeProps({
    ref: elementRef,
    className: className,
    style: props.style,
    onClick: onClick
  }, TreeSelectBase.getOtherProps(props), ptm('root'));
  var keyboardHelper = createKeyboardHelper();
  var labelElement = createLabel();
  var dropdownIcon = createDropdownIcon();
  var content = createContent();
  var header = createHeader();
  var footer = createFooter();
  return /*#__PURE__*/React.createElement("div", rootProps, keyboardHelper, labelElement, dropdownIcon, /*#__PURE__*/React.createElement(TreeSelectPanel, {
    ref: overlayRef,
    appendTo: props.appendTo,
    panelStyle: props.panelStyle,
    panelClassName: props.panelClassName,
    scrollHeight: props.scrollHeight,
    onClick: onOverlayClick,
    header: header,
    footer: footer,
    transitionOptions: props.transitionOptions,
    "in": overlayVisibleState,
    onEnter: onOverlayEnter,
    onEntered: onOverlayEntered,
    onExit: onOverlayExit,
    onExited: onOverlayExited,
    ptm: ptm
  }, content));
}));
TreeSelect.displayName = 'TreeSelect';

export { TreeSelect };
