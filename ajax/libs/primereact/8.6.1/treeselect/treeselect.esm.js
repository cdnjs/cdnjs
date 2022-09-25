import * as React from 'react';
import PrimeReact, { localeOption } from 'primereact/api';
import { useOverlayListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Ripple } from 'primereact/ripple';
import { Tree } from 'primereact/tree';
import { classNames, ObjectUtils, ZIndexUtils, DomHandler } from 'primereact/utils';
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

function _defineProperty(obj, key, value) {
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
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

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

var TreeSelectPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var createElement = function createElement() {
    var wrapperStyle = {
      maxHeight: props.scrollHeight || 'auto'
    };
    var className = classNames('p-treeselect-panel p-component', props.panelClassName);
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
    }, /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: className,
      style: props.panelStyle,
      onClick: props.onClick
    }, props.header, /*#__PURE__*/React.createElement("div", {
      className: "p-treeselect-items-wrapper",
      style: wrapperStyle
    }, props.children), props.footer));
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

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var TreeSelect = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  var focusInputRef = React.useRef(null);
  var triggerRef = React.useRef(null);
  var selfChange = React.useRef(null);
  var expandedKeys = props.onToggle ? props.expandedKeys : expandedKeysState;
  var filteredValue = props.onFilterValueChange ? props.filterValue : filterValueState;
  var isValueEmpty = ObjectUtils.isEmpty(props.value);
  var hasNoOptions = ObjectUtils.isEmpty(props.options);
  var isSingleSelectionMode = props.selectionMode === 'single';
  var isCheckboxSelectionMode = props.selectionMode === 'checkbox';
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
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
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
    ZIndexUtils.set('overlay', overlayRef.current, PrimeReact.autoZIndex, PrimeReact.zIndex['overlay']);
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
    DomHandler.alignOverlay(overlayRef.current, triggerRef.current.parentElement, props.appendTo || PrimeReact.appendTo);
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
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useMountEffect(function () {
    updateTreeState();
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
    return /*#__PURE__*/React.createElement("div", {
      className: "p-hidden-accessible"
    }, /*#__PURE__*/React.createElement("input", _extends({
      ref: focusInputRef,
      role: "listbox",
      id: props.inputId,
      type: "text",
      readOnly: true,
      "aria-expanded": overlayVisibleState,
      onFocus: onInputFocus,
      onBlur: onInputBlur,
      onKeyDown: onInputKeyDown,
      disabled: props.disabled,
      tabIndex: props.tabIndex
    }, ariaProps)));
  };

  var createLabel = function createLabel() {
    var labelClassName = classNames('p-treeselect-label', {
      'p-placeholder': getLabel() === props.placeholder,
      'p-treeselect-label-empty': !props.placeholder && isValueEmpty
    });
    var content = null;

    if (props.valueTemplate) {
      content = ObjectUtils.getJSXElement(props.valueTemplate, selectedNodes, props);
    } else {
      if (props.display === 'comma') {
        content = getLabel() || 'empty';
      } else if (props.display === 'chip') {
        content = /*#__PURE__*/React.createElement(React.Fragment, null, selectedNodes && selectedNodes.map(function (node, index) {
          return /*#__PURE__*/React.createElement("div", {
            className: "p-treeselect-token",
            key: "".concat(node.key, "_").concat(index)
          }, /*#__PURE__*/React.createElement("span", {
            className: "p-treeselect-token-label"
          }, node.label));
        }), isValueEmpty && (props.placeholder || 'empty'));
      }
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "p-treeselect-label-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: labelClassName
    }, content));
  };

  var createDropdownIcon = function createDropdownIcon() {
    var iconClassName = classNames('p-treeselect-trigger-icon p-clickable', props.dropdownIcon);
    return /*#__PURE__*/React.createElement("div", {
      ref: triggerRef,
      className: "p-treeselect-trigger",
      role: "button",
      "aria-haspopup": "listbox",
      "aria-expanded": overlayVisibleState
    }, /*#__PURE__*/React.createElement("span", {
      className: iconClassName
    }));
  };

  var createContent = function createContent() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tree, {
      value: props.options,
      selectionMode: props.selectionMode,
      selectionKeys: props.value,
      metaKeySelection: props.metaKeySelection,
      onSelectionChange: onSelectionChange,
      onSelect: onNodeSelect,
      onUnselect: onNodeUnselect,
      expandedKeys: expandedKeys,
      onToggle: onNodeToggle,
      onExpand: props.onNodeExpand,
      onCollapse: props.onNodeCollapse,
      filter: props.filter,
      filterValue: filteredValue,
      filterBy: props.filterBy,
      filterMode: props.filterMode,
      filterPlaceholder: props.filterPlaceholder,
      filterLocale: props.filterLocale,
      showHeader: false,
      onFilterValueChange: onFilterValueChange
    }), hasNoOptions && /*#__PURE__*/React.createElement("div", {
      className: "p-treeselect-empty-message"
    }, props.emptyMessage || localeOption('emptyMessage')));
  };

  var createFilterElement = function createFilterElement() {
    if (props.filter) {
      var filterValue = ObjectUtils.isNotEmpty(filteredValue) ? filteredValue : '';
      var filterContent = /*#__PURE__*/React.createElement("div", {
        className: "p-treeselect-filter-container"
      }, /*#__PURE__*/React.createElement("input", {
        ref: filterInputRef,
        type: "text",
        value: filterValue,
        autoComplete: "off",
        className: "p-treeselect-filter p-inputtext p-component",
        placeholder: props.filterPlaceholder,
        onKeyDown: onFilterInputKeyDown,
        onChange: onFilterInputChange,
        disabled: props.disabled
      }), /*#__PURE__*/React.createElement("span", {
        className: "p-treeselect-filter-icon pi pi-search"
      }));

      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-treeselect-filter-container',
          element: filterContent,
          filterOptions: filterOptions,
          filterInputKeyDown: onFilterInputKeyDown,
          filterInputChange: onFilterInputChange,
          filterIconClassName: 'p-dropdown-filter-icon pi pi-search',
          props: props
        };
        filterContent = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, filterContent);
    }
  };

  var createHeader = function createHeader() {
    var filterElement = createFilterElement();
    var closeElement = /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "p-treeselect-close p-link",
      onClick: hide,
      "aria-label": localeOption('close')
    }, /*#__PURE__*/React.createElement("span", {
      className: "p-treeselect-close-icon pi pi-times",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement(Ripple, null));
    var content = /*#__PURE__*/React.createElement("div", {
      className: "p-treeselect-header"
    }, filterElement, closeElement);

    if (props.panelHeaderTemplate) {
      var defaultOptions = {
        className: 'p-treeselect-header',
        filterElement: filterElement,
        closeElement: closeElement,
        closeElementClassName: 'p-treeselect-close p-link',
        closeIconClassName: 'p-treeselect-close-icon pi pi-times',
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
  var otherProps = ObjectUtils.findDiffKeys(props, TreeSelect.defaultProps);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-treeselect p-component p-inputwrapper', {
    'p-treeselect-chip': props.display === 'chip',
    'p-disabled': props.disabled,
    'p-focus': focusedState,
    'p-inputwrapper-filled': !isValueEmpty,
    'p-inputwrapper-focus': focusedState || overlayVisibleState
  }, props.className);
  var keyboardHelper = createKeyboardHelper();
  var labelElement = createLabel();
  var dropdownIcon = createDropdownIcon();
  var content = createContent();
  var header = createHeader();
  var footer = createFooter();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick
  }), keyboardHelper, labelElement, dropdownIcon, /*#__PURE__*/React.createElement(TreeSelectPanel, {
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
    onExited: onOverlayExited
  }, content));
}));
TreeSelect.displayName = 'TreeSelect';
TreeSelect.defaultProps = {
  __TYPE: 'TreeSelect',
  id: null,
  value: null,
  name: null,
  style: null,
  className: null,
  disabled: false,
  options: null,
  scrollHeight: '400px',
  placeholder: null,
  tabIndex: null,
  inputId: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  selectionMode: 'single',
  expandedKeys: null,
  panelStyle: null,
  panelClassName: null,
  appendTo: null,
  emptyMessage: null,
  display: 'comma',
  metaKeySelection: true,
  valueTemplate: null,
  panelHeaderTemplate: null,
  panelFooterTemplate: null,
  transitionOptions: null,
  dropdownIcon: 'pi pi-chevron-down',
  filter: false,
  filterTemplate: null,
  filterValue: null,
  filterBy: 'label',
  filterMode: 'lenient',
  filterPlaceholder: null,
  filterLocale: undefined,
  filterInputAutoFocus: true,
  resetFilterOnHide: false,
  onShow: null,
  onHide: null,
  onChange: null,
  onNodeSelect: null,
  onNodeUnselect: null,
  onNodeExpand: null,
  onNodeCollapse: null,
  onFilterValueChange: null
};

export { TreeSelect };
