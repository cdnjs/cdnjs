import * as React from 'react';
import PrimeReact, { ariaLabel, localeOption, FilterMatchMode, FilterService } from 'primereact/api';
import { useEventListener, useUnmountEffect, useMountEffect } from 'primereact/hooks';
import { Paginator } from 'primereact/paginator';
import { DomHandler, ObjectUtils, classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import { OverlayService } from 'primereact/overlayservice';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';

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

function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$4(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread();
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
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest();
}

var TreeTableBodyCell = function TreeTableBodyCell(props) {
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    editingState = _React$useState2[0],
    setEditingState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var keyHelperRef = React.useRef(null);
  var selfClick = React.useRef(false);
  var overlayEventListener = React.useRef(null);
  var tabIndexTimeout = React.useRef(null);
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(e) {
        if (!selfClick.current && isOutsideClicked(e.target)) {
          switchCellToViewMode(e);
        }
        selfClick.current = false;
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var onClick = function onClick() {
    if (props.editor && !editingState && (props.selectOnEdit || !props.selectOnEdit && props.selected)) {
      selfClick.current = true;
      setEditingState(true);
      bindDocumentClickListener();
      overlayEventListener.current = function (e) {
        if (!isOutsideClicked(e.target)) {
          selfClick.current = true;
        }
      };
      OverlayService.on('overlay-click', overlayEventListener.current);
    }
  };
  var onKeyDown = function onKeyDown(event) {
    if (event.which === 13 || event.which === 9) {
      switchCellToViewMode(event);
    }
  };
  var isOutsideClicked = function isOutsideClicked(target) {
    return elementRef.current && !(elementRef.current.isSameNode(target) || elementRef.current.contains(target));
  };
  var closeCell = function closeCell() {
    /* When using the 'tab' key, the focus event of the next cell is not called in IE. */
    setTimeout(function () {
      setEditingState(false);
      unbindDocumentClickListener();
      OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
    }, 1);
  };
  var onEditorFocus = function onEditorFocus(event) {
    onClick();
  };
  var switchCellToViewMode = function switchCellToViewMode(event) {
    if (props.cellEditValidator) {
      var valid = props.cellEditValidator({
        originalEvent: event,
        columnProps: props
      });
      if (valid) {
        closeCell();
      }
    } else {
      closeCell();
    }
  };
  React.useEffect(function () {
    if (elementRef.current && props.editor) {
      clearTimeout(tabIndexTimeout.current);
      if (editingState) {
        var focusable = DomHandler.findSingle(elementRef.current, 'input');
        if (focusable && document.activeElement !== focusable && !focusable.hasAttribute('data-isCellEditing')) {
          focusable.setAttribute('data-isCellEditing', true);
          focusable.focus();
        }
        keyHelperRef.current.tabIndex = -1;
      } else {
        tabIndexTimeout.current = setTimeout(function () {
          if (keyHelperRef.current) {
            keyHelperRef.current.setAttribute('tabindex', 0);
          }
        }, 50);
      }
    }
  });
  useUnmountEffect(function () {
    if (overlayEventListener.current) {
      OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
    }
  });
  var bodyClassName = ObjectUtils.getPropValue(props.bodyClassName, props.node.data, {
    field: props.field,
    rowIndex: props.rowIndex,
    props: props
  });
  var className = classNames(bodyClassName || props.className, {
    'p-editable-column': props.editor,
    'p-cell-editing': props.editor ? editingState : false
  });
  var style = props.bodyStyle || props.style;
  var content;
  if (editingState) {
    if (props.editor) content = ObjectUtils.getJSXElement(props.editor, {
      node: props.node,
      rowData: props.node.data,
      value: ObjectUtils.resolveFieldData(props.node.data, props.field),
      field: props.field,
      rowIndex: props.rowIndex,
      props: props
    });else throw new Error('Editor is not found on column.');
  } else {
    if (props.body) content = ObjectUtils.getJSXElement(props.body, props.node, {
      field: props.field,
      rowIndex: props.rowIndex,
      props: props
    });else content = ObjectUtils.resolveFieldData(props.node.data, props.field);
  }

  /* eslint-disable */
  var editorKeyHelper = props.editor && /*#__PURE__*/React.createElement("a", {
    tabIndex: 0,
    ref: keyHelperRef,
    className: "p-cell-editor-key-helper p-hidden-accessible",
    onFocus: onEditorFocus
  }, /*#__PURE__*/React.createElement("span", null));
  /* eslint-enable */

  return /*#__PURE__*/React.createElement("td", {
    ref: elementRef,
    className: className,
    style: style,
    onClick: onClick,
    onKeyDown: onKeyDown
  }, props.children, editorKeyHelper, content);
};
TreeTableBodyCell.displayName = 'TreeTableBodyCell';

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TreeTableRow = /*#__PURE__*/React.memo(function (props) {
  var elementRef = React.useRef(null);
  var checkboxRef = React.useRef(null);
  var checkboxBoxRef = React.useRef(null);
  var nodeTouched = React.useRef(false);
  var expanded = props.expandedKeys ? props.expandedKeys[props.node.key] !== undefined : false;
  var onTogglerClick = function onTogglerClick(event) {
    expanded ? collapse(event) : expand(event);
    event.preventDefault();
    event.stopPropagation();
  };
  var expand = function expand(event) {
    var expandedKeys = props.expandedKeys ? _objectSpread$2({}, props.expandedKeys) : {};
    expandedKeys[props.node.key] = true;
    props.onToggle({
      originalEvent: event,
      value: expandedKeys
    });
    invokeToggleEvents(event, true);
  };
  var collapse = function collapse(event) {
    var expandedKeys = _objectSpread$2({}, props.expandedKeys);
    delete expandedKeys[props.node.key];
    props.onToggle({
      originalEvent: event,
      value: expandedKeys
    });
    invokeToggleEvents(event, false);
  };
  var invokeToggleEvents = function invokeToggleEvents(event, expanded) {
    if (expanded) {
      if (props.onExpand) {
        props.onExpand({
          originalEvent: event,
          node: props.node
        });
      }
    } else {
      if (props.onCollapse) {
        props.onCollapse({
          originalEvent: event,
          node: props.node
        });
      }
    }
  };
  var onClick = function onClick(event) {
    if (props.onRowClick) {
      props.onRowClick(event, props.node);
    }
    nodeTouched.current = false;
  };
  var onTouchEnd = function onTouchEnd() {
    nodeTouched.current = true;
  };
  var onCheckboxChange = function onCheckboxChange(event) {
    var checked = isChecked();
    var selectionKeys = props.selectionKeys ? _objectSpread$2({}, props.selectionKeys) : {};
    if (checked) {
      if (props.propagateSelectionDown) propagateDown(props.node, false, selectionKeys);else delete selectionKeys[props.node.key];
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
      if (props.propagateSelectionDown) propagateDown(props.node, true, selectionKeys);else selectionKeys[props.node.key] = {
        checked: true
      };
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
    if (props.onSelectionChange) {
      props.onSelectionChange({
        originalEvent: event,
        value: selectionKeys
      });
    }
    DomHandler.clearSelection();
  };
  var onCheckboxFocus = function onCheckboxFocus() {
    DomHandler.addClass(checkboxBoxRef.current, 'p-focus');
    DomHandler.addClass(checkboxRef.current, 'p-checkbox-focused');
  };
  var onCheckboxBlur = function onCheckboxBlur() {
    DomHandler.removeClass(checkboxBoxRef.current, 'p-focus');
    DomHandler.removeClass(checkboxRef.current, 'p-checkbox-focused');
  };
  var propagateUp = function propagateUp(event) {
    var check = event.check;
    var selectionKeys = event.selectionKeys;
    var checkedChildCount = 0;
    var childPartialSelected = false;
    var _iterator = _createForOfIteratorHelper$3(props.node.children),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        if (selectionKeys[child.key] && selectionKeys[child.key].checked) checkedChildCount++;else if (selectionKeys[child.key] && selectionKeys[child.key].partialChecked) childPartialSelected = true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (check && checkedChildCount === props.node.children.length) {
      selectionKeys[props.node.key] = {
        checked: true,
        partialChecked: false
      };
    } else {
      if (!check) {
        delete selectionKeys[props.node.key];
      }
      if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== props.node.children.length) selectionKeys[props.node.key] = {
        checked: false,
        partialChecked: true
      };else selectionKeys[props.node.key] = {
        checked: false,
        partialChecked: false
      };
    }
    if (props.propagateSelectionUp && props.onPropagateUp) {
      props.onPropagateUp(event);
    }
  };
  var propagateDown = function propagateDown(node, check, selectionKeys) {
    if (check) selectionKeys[node.key] = {
      checked: true,
      partialChecked: false
    };else delete selectionKeys[node.key];
    if (node.children && node.children.length) {
      for (var i = 0; i < node.children.length; i++) {
        propagateDown(node.children[i], check, selectionKeys);
      }
    }
  };
  var onRightClick = function onRightClick(event) {
    DomHandler.clearSelection();
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
    if (event.target === elementRef.current) {
      var rowElement = event.currentTarget;
      switch (event.which) {
        //down arrow
        case 40:
          var nextRow = rowElement.nextElementSibling;
          if (nextRow) {
            nextRow.focus();
          }
          event.preventDefault();
          break;

        //up arrow
        case 38:
          var previousRow = rowElement.previousElementSibling;
          if (previousRow) {
            previousRow.focus();
          }
          event.preventDefault();
          break;

        //right arrow
        case 39:
          if (!expanded) {
            expand(event);
          }
          event.preventDefault();
          break;

        //left arrow
        case 37:
          if (expanded) {
            collapse(event);
          }
          event.preventDefault();
          break;

        //enter
        case 13:
          onClick(event);
          event.preventDefault();
          break;
      }
    }
  };
  var isSelected = function isSelected() {
    if ((props.selectionMode === 'single' || props.selectionMode === 'multiple') && props.selectionKeys) return props.selectionMode === 'single' ? props.selectionKeys === props.node.key : props.selectionKeys[props.node.key] !== undefined;else return false;
  };
  var isChecked = function isChecked() {
    return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].checked : false;
  };
  var isPartialChecked = function isPartialChecked() {
    return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].partialChecked : false;
  };
  var createToggler = function createToggler() {
    var label = expanded ? ariaLabel('collapseLabel') : ariaLabel('expandLabel');
    var iconClassName = classNames('p-treetable-toggler-icon pi pi-fw', {
      'pi-chevron-right': !expanded,
      'pi-chevron-down': expanded
    });
    var style = {
      marginLeft: props.level * 16 + 'px',
      visibility: props.node.leaf === false || props.node.children && props.node.children.length ? 'visible' : 'hidden'
    };
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "p-treetable-toggler p-link p-unselectable-text",
      onClick: onTogglerClick,
      tabIndex: -1,
      style: style,
      "aria-label": label
    }, /*#__PURE__*/React.createElement("i", {
      className: iconClassName,
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement(Ripple, null));
  };
  var createCheckbox = function createCheckbox() {
    if (props.selectionMode === 'checkbox' && props.node.selectable !== false) {
      var checked = isChecked();
      var partialChecked = isPartialChecked();
      var _className = classNames('p-checkbox-box', {
        'p-highlight': checked,
        'p-indeterminate': partialChecked
      });
      var icon = classNames('p-checkbox-icon p-c', {
        'pi pi-check': checked,
        'pi pi-minus': partialChecked
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "p-checkbox p-treetable-checkbox p-component",
        ref: checkboxRef,
        onClick: onCheckboxChange,
        role: "checkbox",
        "aria-checked": checked
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        onFocus: onCheckboxFocus,
        onBlur: onCheckboxBlur
      })), /*#__PURE__*/React.createElement("div", {
        className: _className,
        ref: checkboxBoxRef
      }, /*#__PURE__*/React.createElement("span", {
        className: icon
      })));
    } else {
      return null;
    }
  };
  var createCell = function createCell(column) {
    var toggler, checkbox;
    if (column.props.expander) {
      toggler = createToggler();
      checkbox = createCheckbox();
    }
    return /*#__PURE__*/React.createElement(TreeTableBodyCell, _extends({
      key: column.props.columnKey || column.props.field
    }, column.props, {
      column: column,
      selectOnEdit: props.selectOnEdit,
      selected: isSelected(),
      node: props.node,
      rowIndex: props.rowIndex
    }), toggler, checkbox);
  };
  var createChildren = function createChildren() {
    if (expanded && props.node.children) {
      return props.node.children.map(function (childNode, index) {
        return /*#__PURE__*/React.createElement(TreeTableRow, {
          key: childNode.key || JSON.stringify(childNode.data),
          level: props.level + 1,
          rowIndex: props.rowIndex + '_' + index,
          node: childNode,
          columns: props.columns,
          expandedKeys: props.expandedKeys,
          selectOnEdit: props.selectOnEdit,
          onToggle: props.onToggle,
          onExpand: props.onExpand,
          onCollapse: props.onCollapse,
          selectionMode: props.selectionMode,
          selectionKeys: props.selectionKeys,
          onSelectionChange: props.onSelectionChange,
          metaKeySelection: props.metaKeySelection,
          onRowClick: props.onRowClick,
          onSelect: props.onSelect,
          onUnselect: props.onUnselect,
          propagateSelectionUp: props.propagateSelectionUp,
          propagateSelectionDown: props.propagateSelectionDown,
          onPropagateUp: propagateUp,
          rowClassName: props.rowClassName,
          contextMenuSelectionKey: props.contextMenuSelectionKey,
          onContextMenuSelectionChange: props.onContextMenuSelectionChange,
          onContextMenu: props.onContextMenu
        });
      });
    } else {
      return null;
    }
  };
  var cells = props.columns.map(createCell);
  var children = createChildren();
  var className = {
    'p-highlight': isSelected(),
    'p-highlight-contextmenu': props.contextMenuSelectionKey && props.contextMenuSelectionKey === props.node.key
  };
  if (props.rowClassName) {
    var rowClassName = props.rowClassName(props.node);
    className = _objectSpread$2(_objectSpread$2({}, className), rowClassName);
  }
  className = classNames(className, props.node.className);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("tr", {
    ref: elementRef,
    tabIndex: 0,
    className: className,
    style: props.node.style,
    onClick: onClick,
    onTouchEnd: onTouchEnd,
    onContextMenu: onRightClick,
    onKeyDown: onKeyDown
  }, cells), children);
});
TreeTableRow.displayName = 'TreeTableRow';

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var TreeTableBody = /*#__PURE__*/React.memo(function (props) {
  var isSingleSelectionMode = props.selectionMode === 'single';
  var isMultipleSelectionMode = props.selectionMode === 'multiple';
  var flattenizeTree = function flattenizeTree(nodes) {
    var rows = [];
    nodes = nodes || props.value;
    var _iterator = _createForOfIteratorHelper$2(nodes),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        rows.push(node.key);
        if (isExpandedKey(node.key)) {
          rows = rows.concat(flattenizeTree(node.children));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return rows;
  };
  var isExpandedKey = function isExpandedKey(key) {
    return props.expandedKeys && !!props.expandedKeys[key];
  };
  var onRowClick = function onRowClick(event, node) {
    if (props.onRowClick) {
      props.onRowClick({
        originalEvent: event,
        node: node
      });
    }
    var targetNode = event.target.nodeName;
    if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || DomHandler.hasClass(event.target, 'p-clickable')) {
      return;
    }
    if ((isSingleSelectionMode || isMultipleSelectionMode) && node.selectable !== false) {
      var selectionKeys;
      var selected = isSelected(node);
      var metaSelection = props.metaKeySelection;
      var flatKeys = flattenizeTree();
      var rowIndex = flatKeys.findIndex(function (key) {
        return key === node.key;
      });
      if (isMultipleSelectionMode && event.shiftKey) {
        DomHandler.clearSelection();

        // find first selected row
        var anchorRowIndex = flatKeys.findIndex(function (key) {
          return props.selectionKeys[key];
        });
        var rangeStart = Math.min(rowIndex, anchorRowIndex);
        var rangeEnd = Math.max(rowIndex, anchorRowIndex);
        selectionKeys = _objectSpread$1({}, props.selectionKeys);
        for (var i = rangeStart; i <= rangeEnd; i++) {
          var rowKey = flatKeys[i];
          selectionKeys[rowKey] = true;
        }
      } else {
        //anchorRowIndex = rowIndex;

        if (metaSelection) {
          var metaKey = event.metaKey || event.ctrlKey;
          if (selected && metaKey) {
            if (isSingleSelectionMode) {
              selectionKeys = null;
            } else {
              selectionKeys = _objectSpread$1({}, props.selectionKeys);
              delete selectionKeys[node.key];
            }
            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                node: node
              });
            }
          } else {
            if (isSingleSelectionMode) {
              selectionKeys = node.key;
            } else if (isMultipleSelectionMode) {
              selectionKeys = !metaKey ? {} : props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
              selectionKeys[node.key] = true;
            }
            if (props.onSelect) {
              props.onSelect({
                originalEvent: event,
                node: node
              });
            }
          }
        } else {
          if (isSingleSelectionMode) {
            if (selected) {
              selectionKeys = null;
              if (props.onUnselect) {
                props.onUnselect({
                  originalEvent: event,
                  node: node
                });
              }
            } else {
              selectionKeys = node.key;
              if (props.onSelect) {
                props.onSelect({
                  originalEvent: event,
                  node: node
                });
              }
            }
          } else {
            if (selected) {
              selectionKeys = _objectSpread$1({}, props.selectionKeys);
              delete selectionKeys[node.key];
              if (props.onUnselect) {
                props.onUnselect({
                  originalEvent: event,
                  node: node
                });
              }
            } else {
              selectionKeys = props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
              selectionKeys[node.key] = true;
              if (props.onSelect) {
                props.onSelect({
                  originalEvent: event,
                  node: node
                });
              }
            }
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
  };
  var isSelected = function isSelected(node) {
    if ((isSingleSelectionMode || isMultipleSelectionMode) && props.selectionKeys) return isSingleSelectionMode ? props.selectionKeys === node.key : props.selectionKeys[node.key] !== undefined;else return false;
  };
  var createRow = function createRow(node, index) {
    return /*#__PURE__*/React.createElement(TreeTableRow, {
      key: node.key || JSON.stringify(node.data),
      level: 0,
      rowIndex: index,
      selectOnEdit: props.selectOnEdit,
      node: node,
      columns: props.columns,
      expandedKeys: props.expandedKeys,
      onToggle: props.onToggle,
      onExpand: props.onExpand,
      onCollapse: props.onCollapse,
      selectionMode: props.selectionMode,
      selectionKeys: props.selectionKeys,
      onSelectionChange: props.onSelectionChange,
      metaKeySelection: props.metaKeySelection,
      onRowClick: onRowClick,
      onSelect: props.onSelect,
      onUnselect: props.onUnselect,
      propagateSelectionUp: props.propagateSelectionUp,
      propagateSelectionDown: props.propagateSelectionDown,
      rowClassName: props.rowClassName,
      contextMenuSelectionKey: props.contextMenuSelectionKey,
      onContextMenuSelectionChange: props.onContextMenuSelectionChange,
      onContextMenu: props.onContextMenu
    });
  };
  var createRows = function createRows() {
    if (props.paginator && !props.lazy) {
      var rpp = props.rows || 0;
      var startIndex = props.first || 0;
      var endIndex = startIndex + rpp;
      var rows = [];
      for (var i = startIndex; i < endIndex; i++) {
        var rowData = props.value[i];
        if (rowData) rows.push(createRow(props.value[i]));else break;
      }
      return rows;
    } else {
      return props.value.map(createRow);
    }
  };
  var createEmptyMessage = function createEmptyMessage() {
    if (props.loading) {
      return null;
    } else {
      var colSpan = props.columns ? props.columns.length : null;
      var _content = props.emptyMessage || localeOption('emptyMessage');
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
        className: "p-treetable-emptymessage",
        colSpan: colSpan
      }, _content));
    }
  };
  var content = props.value && props.value.length ? createRows() : createEmptyMessage();
  return /*#__PURE__*/React.createElement("tbody", {
    className: "p-treetable-tbody"
  }, content);
});
TreeTableBody.displayName = 'TreeTableBody';

var TreeTableFooter = /*#__PURE__*/React.memo(function (props) {
  var createFooterCell = function createFooterCell(column, index) {
    return /*#__PURE__*/React.createElement("td", {
      key: column.field || index,
      className: column.props.footerClassName || column.props.className,
      style: column.props.footerStyle || column.props.style,
      rowSpan: column.props.rowSpan,
      colSpan: column.props.colSpan
    }, column.props.footer);
  };
  var createFooterRow = function createFooterRow(row, index) {
    var rowColumns = React.Children.toArray(row.props.children);
    var rowFooterCells = rowColumns.map(createFooterCell);
    return /*#__PURE__*/React.createElement("tr", {
      key: index
    }, rowFooterCells);
  };
  var createColumnGroup = function createColumnGroup() {
    var rows = React.Children.toArray(props.columnGroup.props.children);
    return rows.map(createFooterRow);
  };
  var createColumns = function createColumns(columns) {
    if (columns) {
      var headerCells = columns.map(createFooterCell);
      return /*#__PURE__*/React.createElement("tr", null, headerCells);
    } else {
      return null;
    }
  };
  var hasFooter = function hasFooter() {
    if (props.columnGroup) {
      return true;
    } else {
      for (var i = 0; i < props.columns.length; i++) {
        if (props.columns[i].props.footer) {
          return true;
        }
      }
    }
    return false;
  };
  var content = props.columnGroup ? createColumnGroup() : createColumns(props.columns);
  if (hasFooter()) {
    return /*#__PURE__*/React.createElement("tfoot", {
      className: "p-treetable-tfoot"
    }, content);
  } else {
    return null;
  }
});
TreeTableFooter.displayName = 'TreeTableFooter';

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var TreeTableHeader = /*#__PURE__*/React.memo(function (props) {
  var filterTimeout = React.useRef(null);
  var onHeaderClick = function onHeaderClick(event, column) {
    if (column.props.sortable) {
      var targetNode = event.target;
      if (DomHandler.hasClass(targetNode, 'p-sortable-column') || DomHandler.hasClass(targetNode, 'p-column-title') || DomHandler.hasClass(targetNode, 'p-sortable-column-icon') || DomHandler.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {
        props.onSort({
          originalEvent: event,
          sortField: column.props.sortField || column.props.field,
          sortFunction: column.props.sortFunction,
          sortable: column.props.sortable
        });
        DomHandler.clearSelection();
      }
    }
  };
  var onHeaderMouseDown = function onHeaderMouseDown(event, column) {
    if (props.reorderableColumns && column.props.reorderable) {
      if (event.target.nodeName !== 'INPUT') event.currentTarget.draggable = true;else if (event.target.nodeName === 'INPUT') event.currentTarget.draggable = false;
    }
  };
  var onHeaderKeyDown = function onHeaderKeyDown(event, column) {
    if (event.key === 'Enter') {
      onHeaderClick(event, column);
      event.preventDefault();
    }
  };
  var getMultiSortMetaDataIndex = function getMultiSortMetaDataIndex(column) {
    if (props.multiSortMeta) {
      for (var i = 0; i < props.multiSortMeta.length; i++) {
        if (props.multiSortMeta[i].field === column.props.field) {
          return i;
        }
      }
    }
    return -1;
  };
  var onResizerMouseDown = function onResizerMouseDown(event, column) {
    if (props.resizableColumns && props.onResizeStart) {
      props.onResizeStart({
        originalEvent: event,
        columnEl: event.target.parentElement,
        column: column
      });
    }
  };
  var _onDragStart = function onDragStart(event, column) {
    if (props.onDragStart) {
      props.onDragStart({
        originalEvent: event,
        column: column
      });
    }
  };
  var _onDragOver = function onDragOver(event, column) {
    if (props.onDragOver) {
      props.onDragOver({
        originalEvent: event,
        column: column
      });
    }
  };
  var _onDragLeave = function onDragLeave(event, column) {
    if (props.onDragLeave) {
      props.onDragLeave({
        originalEvent: event,
        column: column
      });
    }
  };
  var _onDrop = function onDrop(event, column) {
    if (props.onDrop) {
      props.onDrop({
        originalEvent: event,
        column: column
      });
    }
  };
  var onFilterInput = function onFilterInput(e, column) {
    if (column.props.filter && props.onFilter) {
      if (filterTimeout.current) {
        clearTimeout(filterTimeout.current);
      }
      var filterValue = e.target.value;
      filterTimeout.current = setTimeout(function () {
        props.onFilter({
          value: filterValue,
          field: column.props.field,
          matchMode: column.props.filterMatchMode || 'startsWith'
        });
        filterTimeout.current = null;
      }, props.filterDelay);
    }
  };
  var hasColumnFilter = function hasColumnFilter(columns) {
    if (columns) {
      var _iterator = _createForOfIteratorHelper$1(columns),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var col = _step.value;
          if (col.props.filter) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return false;
  };
  var getAriaSort = function getAriaSort(column, sorted, sortOrder) {
    if (column.props.sortable) {
      var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-down' : 'pi-sort-up' : 'pi-sort';
      if (sortIcon === 'pi-sort-down') return 'descending';else if (sortIcon === 'pi-sort-up') return 'ascending';else return 'none';
    } else {
      return null;
    }
  };
  var getColumnProp = function getColumnProp(column) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return column ? typeof args[0] === 'string' ? column.props[args[0]] : (args[0] || column).props[args[1]] : null;
  };
  var createSortIcon = function createSortIcon(column, sorted, sortOrder) {
    if (column.props.sortable) {
      var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-amount-down' : 'pi-sort-amount-up-alt' : 'pi-sort-alt';
      var sortIconClassName = classNames('p-sortable-column-icon', 'pi pi-fw', sortIcon);
      return /*#__PURE__*/React.createElement("span", {
        className: sortIconClassName
      });
    } else {
      return null;
    }
  };
  var createResizer = function createResizer(column) {
    if (props.resizableColumns) {
      return /*#__PURE__*/React.createElement("span", {
        className: "p-column-resizer p-clickable",
        onMouseDown: function onMouseDown(e) {
          return onResizerMouseDown(e, column);
        }
      });
    } else {
      return null;
    }
  };
  var createSortBadge = function createSortBadge(sortMetaDataIndex) {
    if (sortMetaDataIndex !== -1 && props.multiSortMeta && props.multiSortMeta.length > 1) {
      return /*#__PURE__*/React.createElement("span", {
        className: "p-sortable-column-badge"
      }, sortMetaDataIndex + 1);
    }
    return null;
  };
  var createHeaderCell = function createHeaderCell(column, options) {
    var filterElement;
    if (column.props.filter && options.renderFilter) {
      filterElement = column.props.filterElement || /*#__PURE__*/React.createElement(InputText, {
        onInput: function onInput(e) {
          return onFilterInput(e, column);
        },
        type: props.filterType,
        defaultValue: props.filters && props.filters[column.props.field] ? props.filters[column.props.field].value : null,
        className: "p-column-filter",
        placeholder: column.props.filterPlaceholder,
        maxLength: column.props.filterMaxLength
      });
    }
    if (options.filterOnly) {
      return /*#__PURE__*/React.createElement("th", {
        key: column.props.columnKey || column.props.field || options.index,
        className: classNames('p-filter-column', column.props.filterHeaderClassName),
        style: column.props.filterHeaderStyle || column.props.style,
        rowSpan: column.props.rowSpan,
        colSpan: column.props.colSpan
      }, filterElement);
    } else {
      var headerCellRef = /*#__PURE__*/React.createRef(null);
      var sortMetaDataIndex = getMultiSortMetaDataIndex(column);
      var multiSortMetaData = sortMetaDataIndex !== -1 ? props.multiSortMeta[sortMetaDataIndex] : null;
      var singleSorted = column.props.field === props.sortField;
      var multipleSorted = multiSortMetaData !== null;
      var sorted = column.props.sortable && (singleSorted || multipleSorted);
      var sortOrder = 0;
      if (singleSorted) sortOrder = props.sortOrder;else if (multipleSorted) sortOrder = multiSortMetaData.order;
      var sortIconElement = createSortIcon(column, sorted, sortOrder);
      var ariaSortData = getAriaSort(column, sorted, sortOrder);
      var sortBadge = createSortBadge(sortMetaDataIndex);
      var className = classNames(column.props.headerClassName || column.props.className, {
        'p-sortable-column': column.props.sortable,
        'p-highlight': sorted,
        'p-resizable-column': props.resizableColumns && getColumnProp(column, 'resizeable')
      });
      var headerTooltip = column.props.headerTooltip;
      var hasTooltip = ObjectUtils.isNotEmpty(headerTooltip);
      var resizer = createResizer(column);
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: column.columnKey || column.field || options.index
      }, /*#__PURE__*/React.createElement("th", {
        ref: headerCellRef,
        className: className,
        style: column.props.headerStyle || column.props.style,
        tabIndex: column.props.sortable ? props.tabIndex : null,
        onClick: function onClick(e) {
          return onHeaderClick(e, column);
        },
        onMouseDown: function onMouseDown(e) {
          return onHeaderMouseDown(e, column);
        },
        onKeyDown: function onKeyDown(e) {
          return onHeaderKeyDown(e, column);
        },
        rowSpan: column.props.rowSpan,
        colSpan: column.props.colSpan,
        "aria-sort": ariaSortData,
        onDragStart: function onDragStart(e) {
          return _onDragStart(e, column);
        },
        onDragOver: function onDragOver(e) {
          return _onDragOver(e, column);
        },
        onDragLeave: function onDragLeave(e) {
          return _onDragLeave(e, column);
        },
        onDrop: function onDrop(e) {
          return _onDrop(e, column);
        }
      }, resizer, /*#__PURE__*/React.createElement("span", {
        className: "p-column-title"
      }, column.props.header), sortIconElement, sortBadge, filterElement), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
        target: headerCellRef,
        content: headerTooltip
      }, column.props.headerTooltipOptions)));
    }
  };
  var createHeaderRow = function createHeaderRow(row, index) {
    var rowColumns = React.Children.toArray(row.props.children);
    var rowHeaderCells = rowColumns.map(function (col, i) {
      return createHeaderCell(col, {
        index: i,
        filterOnly: false,
        renderFilter: true
      });
    });
    return /*#__PURE__*/React.createElement("tr", {
      key: index
    }, rowHeaderCells);
  };
  var createColumnGroup = function createColumnGroup() {
    var rows = React.Children.toArray(props.columnGroup.props.children);
    return rows.map(createHeaderRow);
  };
  var createColumns = function createColumns(columns) {
    if (columns) {
      if (hasColumnFilter(columns)) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("tr", null, columns.map(function (col, i) {
          return createHeaderCell(col, {
            index: i,
            filterOnly: false,
            renderFilter: false
          });
        })), /*#__PURE__*/React.createElement("tr", null, columns.map(function (col, i) {
          return createHeaderCell(col, {
            index: i,
            filterOnly: true,
            renderFilter: true
          });
        })));
      } else {
        return /*#__PURE__*/React.createElement("tr", null, columns.map(function (col, i) {
          return createHeaderCell(col, {
            index: i,
            filterOnly: false,
            renderFilter: false
          });
        }));
      }
    } else {
      return null;
    }
  };
  var content = props.columnGroup ? createColumnGroup() : createColumns(props.columns);
  return /*#__PURE__*/React.createElement("thead", {
    className: "p-treetable-thead"
  }, content);
});
TreeTableHeader.displayName = 'TreeTableHeader';

var TreeTableScrollableView = /*#__PURE__*/React.memo(function (props) {
  var elementRef = React.useRef(null);
  var scrollHeaderRef = React.useRef(null);
  var scrollHeaderBoxRef = React.useRef(null);
  var scrollBodyRef = React.useRef(null);
  var scrollTableRef = React.useRef(null);
  var scrollFooterRef = React.useRef(null);
  var scrollFooterBoxRef = React.useRef(null);
  var setScrollHeight = function setScrollHeight() {
    if (props.scrollHeight) {
      if (props.scrollHeight.indexOf('%') !== -1) {
        var datatableContainer = findDataTableContainer(elementRef.current);
        scrollBodyRef.current.style.visibility = 'hidden';
        scrollBodyRef.current.style.height = '100px'; //temporary height to calculate static height
        var containerHeight = DomHandler.getOuterHeight(datatableContainer);
        var relativeHeight = DomHandler.getOuterHeight(datatableContainer.parentElement) * parseInt(props.scrollHeight, 10) / 100;
        var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
        var scrollBodyHeight = relativeHeight - staticHeight;
        scrollBodyRef.current.style.height = 'auto';
        scrollBodyRef.current.style.maxHeight = scrollBodyHeight + 'px';
        scrollBodyRef.current.style.visibility = 'visible';
      } else {
        scrollBodyRef.current.style.maxHeight = props.scrollHeight;
      }
    }
  };
  var findDataTableContainer = function findDataTableContainer(element) {
    if (element) {
      var el = element;
      while (el && !DomHandler.hasClass(el, 'p-treetable')) {
        el = el.parentElement;
      }
      return el;
    } else {
      return null;
    }
  };
  var onHeaderScroll = function onHeaderScroll() {
    scrollHeaderRef.current.scrollLeft = 0;
  };
  var onBodyScroll = function onBodyScroll() {
    var frozenView = elementRef.current.previousElementSibling;
    var frozenScrollBody;
    if (frozenView) {
      frozenScrollBody = DomHandler.findSingle(frozenView, '.p-treetable-scrollable-body');
    }
    scrollHeaderBoxRef.current.style.marginLeft = -1 * scrollBodyRef.current.scrollLeft + 'px';
    if (scrollFooterBoxRef.current) {
      scrollFooterBoxRef.current.style.marginLeft = -1 * scrollBodyRef.current.scrollLeft + 'px';
    }
    if (frozenScrollBody) {
      frozenScrollBody.scrollTop = scrollBodyRef.current.scrollTop;
    }
  };
  useMountEffect(function () {
    if (!props.frozen) {
      var scrollBarWidth = DomHandler.calculateScrollbarWidth();
      scrollHeaderBoxRef.current.style.marginRight = scrollBarWidth + 'px';
      if (scrollFooterBoxRef.current) {
        scrollFooterBoxRef.current.style.marginRight = scrollBarWidth + 'px';
      }
    } else {
      scrollBodyRef.current.style.paddingBottom = DomHandler.calculateScrollbarWidth() + 'px';
    }
  });
  React.useEffect(function () {
    setScrollHeight();
  });
  var createColGroup = function createColGroup() {
    if (ObjectUtils.isNotEmpty(props.columns)) {
      var cols = props.columns.map(function (col, i) {
        return /*#__PURE__*/React.createElement("col", {
          key: col.field + '_' + i
        });
      });
      return /*#__PURE__*/React.createElement("colgroup", {
        className: "p-treetable-scrollable-colgroup"
      }, cols);
    } else {
      return null;
    }
  };
  var className = classNames('p-treetable-scrollable-view', {
    'p-treetable-frozen-view': props.frozen,
    'p-treetable-unfrozen-view': !props.frozen && props.frozenWidth
  });
  var width = props.frozen ? props.frozenWidth : 'calc(100% - ' + props.frozenWidth + ')';
  var left = props.frozen ? null : props.frozenWidth;
  var colGroup = createColGroup();
  var scrollableBodyStyle = !props.frozen && props.scrollHeight ? {
    overflowY: 'scroll'
  } : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: width,
      left: left
    },
    ref: elementRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-treetable-scrollable-header",
    ref: scrollHeaderRef,
    onScroll: onHeaderScroll
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-treetable-scrollable-header-box",
    ref: scrollHeaderBoxRef
  }, /*#__PURE__*/React.createElement("table", {
    className: "p-treetable-scrollable-header-table"
  }, colGroup, props.header))), /*#__PURE__*/React.createElement("div", {
    className: "p-treetable-scrollable-body",
    ref: scrollBodyRef,
    style: scrollableBodyStyle,
    onScroll: onBodyScroll
  }, /*#__PURE__*/React.createElement("table", {
    ref: scrollTableRef,
    style: {
      top: '0'
    },
    className: "p-treetable-scrollable-body-table"
  }, colGroup, props.body)), /*#__PURE__*/React.createElement("div", {
    className: "p-treetable-scrollable-footer",
    ref: scrollFooterRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-treetable-scrollable-footer-box",
    ref: scrollFooterBoxRef
  }, /*#__PURE__*/React.createElement("table", {
    className: "p-treetable-scrollable-footer-table"
  }, colGroup, props.footer))));
});
TreeTableScrollableView.displayName = 'TreeTableScrollableView';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TreeTable = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(props.expandedKeys),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    expandedKeysState = _React$useState2[0],
    setExpandedKeysState = _React$useState2[1];
  var _React$useState3 = React.useState(props.first),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    firstState = _React$useState4[0],
    setFirstState = _React$useState4[1];
  var _React$useState5 = React.useState(props.rows),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    rowsState = _React$useState6[0],
    setRowsState = _React$useState6[1];
  var _React$useState7 = React.useState(props.sortField),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    sortFieldState = _React$useState8[0],
    setSortFieldState = _React$useState8[1];
  var _React$useState9 = React.useState(props.sortOrder),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    sortOrderState = _React$useState10[0],
    setSortOrderState = _React$useState10[1];
  var _React$useState11 = React.useState(props.multiSortMeta),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    multiSortMetaState = _React$useState12[0],
    setMultiSortMetaState = _React$useState12[1];
  var _React$useState13 = React.useState(props.filters),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    filtersState = _React$useState14[0],
    setFiltersState = _React$useState14[1];
  var _React$useState15 = React.useState([]),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    columnOrderState = _React$useState16[0],
    setColumnOrderState = _React$useState16[1];
  var elementRef = React.useRef(null);
  var resizerHelperRef = React.useRef(null);
  var reorderIndicatorUpRef = React.useRef(null);
  var reorderIndicatorDownRef = React.useRef(null);
  var columnResizing = React.useRef(null);
  var resizeColumn = React.useRef(null);
  var resizeColumnProps = React.useRef(null);
  var lastResizerHelperX = React.useRef(0);
  var iconWidth = React.useRef(0);
  var iconHeight = React.useRef(0);
  var draggedColumnEl = React.useRef(null);
  var draggedColumn = React.useRef(null);
  var dropPosition = React.useRef(null);
  var columnSortable = React.useRef(null);
  var columnSortFunction = React.useRef(null);
  var columnField = React.useRef(null);
  var _useEventListener = useEventListener({
      type: 'mousemove',
      listener: function listener(event) {
        if (columnResizing.current) {
          onColumnResize(event);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentMouseMoveListener = _useEventListener2[0],
    unbindDocumentMouseMoveListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'mouseup',
      listener: function listener(event) {
        if (columnResizing.current) {
          columnResizing.current = false;
          onColumnResizeEnd();
        }
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMouseUpListener = _useEventListener4[0],
    unbindDocumentMouseUpListener = _useEventListener4[1];
  var onToggle = function onToggle(event) {
    if (props.onToggle) {
      props.onToggle(event);
    } else {
      setExpandedKeysState(event.value);
    }
  };
  var onPageChange = function onPageChange(event) {
    if (props.onPage) {
      props.onPage(event);
    } else {
      setFirstState(event.first);
      setRowsState(event.rows);
    }
  };
  var onSort = function onSort(event) {
    var sortField = event.sortField;
    var sortOrder = props.defaultSortOrder;
    var multiSortMeta;
    var eventMeta;
    columnSortable.current = event.sortable;
    columnSortFunction.current = event.sortFunction;
    columnField.current = event.sortField;
    if (props.sortMode === 'multiple') {
      var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
      multiSortMeta = _toConsumableArray(getMultiSortMeta());
      if (multiSortMeta && multiSortMeta instanceof Array) {
        var sortMeta = multiSortMeta.find(function (sortMeta) {
          return sortMeta.field === sortField;
        });
        sortOrder = sortMeta ? getCalculatedSortOrder(sortMeta.order) : sortOrder;
      }
      var newMetaData = {
        field: sortField,
        order: sortOrder
      };
      if (sortOrder) {
        if (!multiSortMeta || !metaKey) {
          multiSortMeta = [];
        }
        addSortMeta(newMetaData, multiSortMeta);
      } else if (props.removableSort && multiSortMeta) {
        removeSortMeta(newMetaData, multiSortMeta);
      }
      eventMeta = {
        multiSortMeta: multiSortMeta
      };
    } else {
      sortOrder = getSortField() === sortField ? getCalculatedSortOrder(getSortOrder()) : sortOrder;
      if (props.removableSort) {
        sortField = sortOrder ? sortField : null;
      }
      eventMeta = {
        sortField: sortField,
        sortOrder: sortOrder
      };
    }
    if (props.onSort) {
      props.onSort(eventMeta);
    } else {
      setFirstState(0);
      setSortFieldState(eventMeta.sortField);
      setSortOrderState(eventMeta.sortOrder);
      setMultiSortMetaState(eventMeta.multiSortMeta);
    }
  };
  var getCalculatedSortOrder = function getCalculatedSortOrder(currentOrder) {
    return props.removableSort ? props.defaultSortOrder === currentOrder ? currentOrder * -1 : 0 : currentOrder * -1;
  };
  var addSortMeta = function addSortMeta(meta, multiSortMeta) {
    var index = -1;
    for (var i = 0; i < multiSortMeta.length; i++) {
      if (multiSortMeta[i].field === meta.field) {
        index = i;
        break;
      }
    }
    if (index >= 0) multiSortMeta[index] = meta;else multiSortMeta.push(meta);
  };
  var removeSortMeta = function removeSortMeta(meta, multiSortMeta) {
    var index = -1;
    for (var i = 0; i < multiSortMeta.length; i++) {
      if (multiSortMeta[i].field === meta.field) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      multiSortMeta.splice(index, 1);
    }
    multiSortMeta = multiSortMeta.length > 0 ? multiSortMeta : null;
  };
  var sortSingle = function sortSingle(data) {
    return sortNodes(data);
  };
  var sortNodes = function sortNodes(data) {
    var value = _toConsumableArray(data);
    if (columnSortable.current && columnSortable.current === 'custom' && columnSortFunction.current) {
      value = columnSortFunction.current({
        data: data,
        field: getSortField(),
        order: getSortOrder()
      });
    } else {
      value.sort(function (node1, node2) {
        var sortField = getSortField();
        var value1 = ObjectUtils.resolveFieldData(node1.data, sortField);
        var value2 = ObjectUtils.resolveFieldData(node2.data, sortField);
        return compareValuesOnSort(value1, value2, getSortOrder());
      });
      for (var i = 0; i < value.length; i++) {
        if (value[i].children && value[i].children.length) {
          value[i].children = sortNodes(value[i].children);
        }
      }
    }
    return value;
  };
  var sortMultiple = function sortMultiple(data) {
    var multiSortMeta = getMultiSortMeta();
    if (multiSortMeta) return sortMultipleNodes(data, multiSortMeta);else return data;
  };
  var sortMultipleNodes = function sortMultipleNodes(data, multiSortMeta) {
    var value = _toConsumableArray(data);
    value.sort(function (node1, node2) {
      return multisortField(node1, node2, multiSortMeta, 0);
    });
    for (var i = 0; i < value.length; i++) {
      if (value[i].children && value[i].children.length) {
        value[i].children = sortMultipleNodes(value[i].children, multiSortMeta);
      }
    }
    return value;
  };
  var multisortField = function multisortField(node1, node2, multiSortMeta, index) {
    var value1 = ObjectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
    var value2 = ObjectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);

    // check if they are equal handling dates and locales
    if (ObjectUtils.compare(value1, value2, PrimeReact.locale) === 0) {
      return multiSortMeta.length - 1 > index ? multisortField(node1, node2, multiSortMeta, index + 1) : 0;
    }
    return compareValuesOnSort(value1, value2, multiSortMeta[index].order);
  };
  var compareValuesOnSort = function compareValuesOnSort(value1, value2, order) {
    return ObjectUtils.sort(value1, value2, order, PrimeReact.locale, PrimeReact.nullSortOrder);
  };
  var filter = function filter(value, field, mode) {
    onFilter({
      value: value,
      field: field,
      matchMode: mode
    });
  };
  var onFilter = function onFilter(event) {
    var filters = getFilters();
    var newFilters = filters ? _objectSpread({}, filters) : {};
    if (!isFilterBlank(event.value)) newFilters[event.field] = {
      value: event.value,
      matchMode: event.matchMode
    };else if (newFilters[event.field]) delete newFilters[event.field];
    if (props.onFilter) {
      props.onFilter({
        filters: newFilters
      });
    } else {
      setFirstState(0);
      setFiltersState(newFilters);
    }
  };
  var isFilterBlank = function isFilterBlank(filter) {
    if (filter !== null && filter !== undefined) {
      if (typeof filter === 'string' && filter.trim().length === 0 || filter instanceof Array && filter.length === 0) return true;else return false;
    }
    return true;
  };
  var onColumnResizeStart = function onColumnResizeStart(event) {
    var containerLeft = DomHandler.getOffset(elementRef.current).left;
    resizeColumn.current = event.columnEl;
    resizeColumnProps.current = event.column;
    columnResizing.current = true;
    lastResizerHelperX.current = event.originalEvent.pageX - containerLeft + elementRef.current.scrollLeft;
    bindColumnResizeEvents();
  };
  var onColumnResize = function onColumnResize(event) {
    var containerLeft = DomHandler.getOffset(elementRef.current).left;
    DomHandler.addClass(elementRef.current, 'p-unselectable-text');
    resizerHelperRef.current.style.height = elementRef.current.offsetHeight + 'px';
    resizerHelperRef.current.style.top = 0 + 'px';
    resizerHelperRef.current.style.left = event.pageX - containerLeft + elementRef.current.scrollLeft + 'px';
    resizerHelperRef.current.style.display = 'block';
  };
  var onColumnResizeEnd = function onColumnResizeEnd(event) {
    var delta = resizerHelperRef.current.offsetLeft - lastResizerHelperX.current;
    var columnWidth = resizeColumn.current.offsetWidth;
    var newColumnWidth = columnWidth + delta;
    var minWidth = resizeColumn.current.style.minWidth || 15;
    if (columnWidth + delta > parseInt(minWidth, 10)) {
      if (props.columnResizeMode === 'fit') {
        var nextColumn = resizeColumn.current.nextElementSibling;
        var nextColumnWidth = nextColumn.offsetWidth - delta;
        if (newColumnWidth > 15 && nextColumnWidth > 15) {
          if (props.scrollable) {
            var scrollableView = findParentScrollableView(resizeColumn.current);
            var scrollableBodyTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-body-table');
            var scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');
            var scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');
            var resizeColumnIndex = DomHandler.index(resizeColumn.current);
            resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
            resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
            resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
          } else {
            resizeColumn.current.style.width = newColumnWidth + 'px';
            if (nextColumn) {
              nextColumn.style.width = nextColumnWidth + 'px';
            }
          }
        }
      } else if (props.columnResizeMode === 'expand') {
        if (props.scrollable) {
          var _scrollableView = findParentScrollableView(resizeColumn.current);
          var _scrollableBodyTable = DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-body-table');
          var _scrollableHeaderTable = DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-header-table');
          var _scrollableFooterTable = DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-footer-table');
          _scrollableBodyTable.style.width = _scrollableBodyTable.offsetWidth + delta + 'px';
          _scrollableHeaderTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
          if (_scrollableFooterTable) {
            _scrollableFooterTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
          }
          var _resizeColumnIndex = DomHandler.index(resizeColumn.current);
          resizeColGroup(_scrollableHeaderTable, _resizeColumnIndex, newColumnWidth, null);
          resizeColGroup(_scrollableBodyTable, _resizeColumnIndex, newColumnWidth, null);
          resizeColGroup(_scrollableFooterTable, _resizeColumnIndex, newColumnWidth, null);
        } else {
          table.style.width = table.offsetWidth + delta + 'px';
          resizeColumn.current.style.width = newColumnWidth + 'px';
        }
      }
      if (props.onColumnResizeEnd) {
        props.onColumnResizeEnd({
          element: resizeColumn.current,
          column: resizeColumnProps.current,
          delta: delta
        });
      }
    }
    resizerHelperRef.current.style.display = 'none';
    resizeColumn.current = null;
    resizeColumnProps.current = null;
    DomHandler.removeClass(elementRef.current, 'p-unselectable-text');
    unbindColumnResizeEvents();
  };
  var findParentScrollableView = function findParentScrollableView(column) {
    if (column) {
      var parent = column.parentElement;
      while (parent && !DomHandler.hasClass(parent, 'p-treetable-scrollable-view')) {
        parent = parent.parentElement;
      }
      return parent;
    } else {
      return null;
    }
  };
  var resizeColGroup = function resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
    if (table) {
      var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
      if (colGroup) {
        var col = colGroup.children[resizeColumnIndex];
        var nextCol = col.nextElementSibling;
        col.style.width = newColumnWidth + 'px';
        if (nextCol && nextColumnWidth) {
          nextCol.style.width = nextColumnWidth + 'px';
        }
      } else {
        throw new Error('Scrollable tables require a colgroup to support resizable columns');
      }
    }
  };
  var bindColumnResizeEvents = function bindColumnResizeEvents() {
    bindDocumentMouseMoveListener();
    bindDocumentMouseUpListener();
  };
  var unbindColumnResizeEvents = function unbindColumnResizeEvents() {
    unbindDocumentMouseMoveListener();
    unbindDocumentMouseUpListener();
  };
  var onColumnDragStart = function onColumnDragStart(e) {
    var event = e.originalEvent,
      column = e.column;
    if (columnResizing.current) {
      event.preventDefault();
      return;
    }
    iconWidth.current = DomHandler.getHiddenElementOuterWidth(reorderIndicatorUpRef.current);
    iconHeight.current = DomHandler.getHiddenElementOuterHeight(reorderIndicatorUpRef.current);
    draggedColumnEl.current = findParentHeader(event.currentTarget);
    draggedColumn.current = column;
    event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
  };

  var onColumnDragOver = function onColumnDragOver(e) {
    var event = e.originalEvent;
    var dropHeader = findParentHeader(event.currentTarget);
    if (props.reorderableColumns && draggedColumnEl.current && dropHeader) {
      event.preventDefault();
      var containerOffset = DomHandler.getOffset(elementRef.current);
      var dropHeaderOffset = DomHandler.getOffset(dropHeader);
      if (draggedColumnEl.current !== dropHeader) {
        var targetLeft = dropHeaderOffset.left - containerOffset.left;
        //let targetTop =  containerOffset.top - dropHeaderOffset.top;
        var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
        reorderIndicatorUpRef.current.style.top = dropHeaderOffset.top - containerOffset.top - (iconHeight.current - 1) + 'px';
        reorderIndicatorDownRef.current.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
        if (event.pageX > columnCenter) {
          reorderIndicatorUpRef.current.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(iconWidth.current / 2) + 'px';
          reorderIndicatorDownRef.current.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(iconWidth.current / 2) + 'px';
          dropPosition.current = 1;
        } else {
          reorderIndicatorUpRef.current.style.left = targetLeft - Math.ceil(iconWidth.current / 2) + 'px';
          reorderIndicatorDownRef.current.style.left = targetLeft - Math.ceil(iconWidth.current / 2) + 'px';
          dropPosition.current = -1;
        }
        reorderIndicatorUpRef.current.style.display = 'block';
        reorderIndicatorDownRef.current.style.display = 'block';
      }
    }
  };
  var onColumnDragLeave = function onColumnDragLeave(e) {
    var event = e.originalEvent;
    if (props.reorderableColumns && draggedColumnEl.current) {
      event.preventDefault();
      reorderIndicatorUpRef.current.style.display = 'none';
      reorderIndicatorDownRef.current.style.display = 'none';
    }
  };
  var onColumnDrop = function onColumnDrop(e) {
    var event = e.originalEvent,
      column = e.column;
    event.preventDefault();
    if (draggedColumnEl.current) {
      var dragIndex = DomHandler.index(draggedColumnEl.current);
      var dropIndex = DomHandler.index(findParentHeader(event.currentTarget));
      var allowDrop = dragIndex !== dropIndex;
      if (allowDrop && (dropIndex - dragIndex === 1 && dropPosition.current === -1 || dragIndex - dropIndex === 1 && dropPosition.current === 1)) {
        allowDrop = false;
      }
      if (allowDrop) {
        var columns = columnOrderState ? getColumns() : React.Children.toArray(props.children);
        var isSameColumn = function isSameColumn(col1, col2) {
          return col1.props.columnKey || col2.props.columnKey ? ObjectUtils.equals(col1, col2, 'props.columnKey') : ObjectUtils.equals(col1, col2, 'props.field');
        };
        var dragColIndex = columns.findIndex(function (child) {
          return isSameColumn(child, draggedColumn.current);
        });
        var dropColIndex = columns.findIndex(function (child) {
          return isSameColumn(child, column);
        });
        if (dropColIndex < dragColIndex && dropPosition.current === 1) {
          dropColIndex++;
        }
        if (dropColIndex > dragColIndex && dropPosition.current === -1) {
          dropColIndex--;
        }
        ObjectUtils.reorderArray(columns, dragColIndex, dropColIndex);
        var columnOrder = [];
        var _iterator = _createForOfIteratorHelper(columns),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _column = _step.value;
            columnOrder.push(_column.props.columnKey || _column.props.field);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        setColumnOrderState(columnOrder);
        if (props.onColReorder) {
          props.onColReorder({
            dragIndex: dragColIndex,
            dropIndex: dropColIndex,
            columns: columns
          });
        }
      }
      reorderIndicatorUpRef.current.style.display = 'none';
      reorderIndicatorDownRef.current.style.display = 'none';
      draggedColumnEl.current.draggable = false;
      draggedColumnEl.current = null;
      dropPosition.current = null;
    }
  };
  var findParentHeader = function findParentHeader(element) {
    if (element.nodeName === 'TH') {
      return element;
    } else {
      var parent = element.parentElement;
      while (parent.nodeName !== 'TH') {
        parent = parent.parentElement;
        if (!parent) break;
      }
      return parent;
    }
  };
  var getExpandedKeys = function getExpandedKeys() {
    return props.onToggle ? props.expandedKeys : expandedKeysState;
  };
  var getFirst = function getFirst() {
    return props.onPage ? props.first : firstState;
  };
  var getRows = function getRows() {
    return props.onPage ? props.rows : rowsState;
  };
  var getSortField = function getSortField() {
    return props.onSort ? props.sortField : sortFieldState;
  };
  var getSortOrder = function getSortOrder() {
    return props.onSort ? props.sortOrder : sortOrderState;
  };
  var getMultiSortMeta = function getMultiSortMeta() {
    return (props.onSort ? props.multiSortMeta : multiSortMetaState) || [];
  };
  var getFilters = function getFilters() {
    return props.onFilter ? props.filters : filtersState;
  };
  var findColumnByKey = function findColumnByKey(columns, key) {
    if (columns && columns.length) {
      for (var i = 0; i < columns.length; i++) {
        var child = columns[i];
        if (child.props.columnKey === key || child.props.field === key) {
          return child;
        }
      }
    }
    return null;
  };
  var getColumns = function getColumns() {
    var columns = React.Children.toArray(props.children);
    if (columns && columns.length) {
      if (props.reorderableColumns && columnOrderState) {
        var orderedColumns = [];
        var _iterator2 = _createForOfIteratorHelper(columnOrderState),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var columnKey = _step2.value;
            var column = findColumnByKey(columns, columnKey);
            if (column) {
              orderedColumns.push(column);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return [].concat(orderedColumns, _toConsumableArray(columns.filter(function (item) {
          return orderedColumns.indexOf(item) < 0;
        })));
      } else {
        return columns;
      }
    }
    return null;
  };
  var getTotalRecords = function getTotalRecords(data) {
    return props.lazy ? props.totalRecords : data ? data.length : 0;
  };
  var isSingleSelectionMode = function isSingleSelectionMode() {
    return props.selectionMode && props.selectionMode === 'single';
  };
  var isMultipleSelectionMode = function isMultipleSelectionMode() {
    return props.selectionMode && props.selectionMode === 'multiple';
  };
  var isRowSelectionMode = function isRowSelectionMode() {
    return isSingleSelectionMode() || isMultipleSelectionMode();
  };
  var getFrozenColumns = function getFrozenColumns(columns) {
    var frozenColumns = null;
    var _iterator3 = _createForOfIteratorHelper(columns),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var col = _step3.value;
        if (col.props.frozen) {
          frozenColumns = frozenColumns || [];
          frozenColumns.push(col);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return frozenColumns;
  };
  var getScrollableColumns = function getScrollableColumns(columns) {
    var scrollableColumns = null;
    var _iterator4 = _createForOfIteratorHelper(columns),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var col = _step4.value;
        if (!col.props.frozen) {
          scrollableColumns = scrollableColumns || [];
          scrollableColumns.push(col);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return scrollableColumns;
  };
  var filterLocal = function filterLocal(value) {
    var filteredNodes = [];
    var filters = getFilters();
    var columns = React.Children.toArray(props.children);
    var isStrictMode = props.filterMode === 'strict';
    var _iterator5 = _createForOfIteratorHelper(value),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var node = _step5.value;
        var copyNode = _objectSpread({}, node);
        var localMatch = true;
        var globalMatch = false;
        for (var j = 0; j < columns.length; j++) {
          var col = columns[j];
          var filterMeta = filters ? filters[col.props.field] : null;
          var filterField = col.props.field;
          var filterValue = void 0,
            filterConstraint = void 0,
            paramsWithoutNode = void 0,
            options = void 0;

          //local
          if (filterMeta) {
            var filterMatchMode = filterMeta.matchMode || col.props.filterMatchMode || 'startsWith';
            filterValue = filterMeta.value;
            filterConstraint = filterMatchMode === 'custom' ? col.props.filterFunction : FilterService.filters[filterMatchMode];
            options = {
              rowData: node,
              filters: filters,
              props: props,
              column: {
                filterMeta: filterMeta,
                filterField: filterField,
                props: col.props
              }
            };
            paramsWithoutNode = {
              filterField: filterField,
              filterValue: filterValue,
              filterConstraint: filterConstraint,
              isStrictMode: isStrictMode,
              options: options
            };
            if (isStrictMode && !(findFilteredNodes(copyNode, paramsWithoutNode) || isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && !(isFilterMatched(copyNode, paramsWithoutNode) || findFilteredNodes(copyNode, paramsWithoutNode))) {
              localMatch = false;
            }
            if (!localMatch) {
              break;
            }
          }

          //global
          if (props.globalFilter && !globalMatch) {
            var copyNodeForGlobal = _objectSpread({}, copyNode);
            filterValue = props.globalFilter;
            filterConstraint = FilterService.filters[props.globalFilterMatchMode];
            paramsWithoutNode = {
              filterField: filterField,
              filterValue: filterValue,
              filterConstraint: filterConstraint,
              isStrictMode: isStrictMode
            };
            if (isStrictMode && (findFilteredNodes(copyNodeForGlobal, paramsWithoutNode) || isFilterMatched(copyNodeForGlobal, paramsWithoutNode)) || !isStrictMode && (isFilterMatched(copyNodeForGlobal, paramsWithoutNode) || findFilteredNodes(copyNodeForGlobal, paramsWithoutNode))) {
              globalMatch = true;
              copyNode = copyNodeForGlobal;
            }
          }
        }
        var matches = localMatch;
        if (props.globalFilter) {
          matches = localMatch && globalMatch;
        }
        if (matches) {
          filteredNodes.push(copyNode);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return filteredNodes;
  };
  var findFilteredNodes = function findFilteredNodes(node, paramsWithoutNode) {
    if (node) {
      var matched = false;
      if (node.children) {
        var childNodes = _toConsumableArray(node.children);
        node.children = [];
        var _iterator6 = _createForOfIteratorHelper(childNodes),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var childNode = _step6.value;
            var copyChildNode = _objectSpread({}, childNode);
            if (isFilterMatched(copyChildNode, paramsWithoutNode)) {
              matched = true;
              node.children.push(copyChildNode);
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
      if (matched) {
        return true;
      }
    }
  };
  var isFilterMatched = function isFilterMatched(node, _ref) {
    var filterField = _ref.filterField,
      filterValue = _ref.filterValue,
      filterConstraint = _ref.filterConstraint,
      isStrictMode = _ref.isStrictMode,
      options = _ref.options;
    var matched = false;
    var dataFieldValue = ObjectUtils.resolveFieldData(node.data, filterField);
    if (filterConstraint(dataFieldValue, filterValue, props.filterLocale, options)) {
      matched = true;
    }
    if (!matched || isStrictMode && !isNodeLeaf(node)) {
      matched = findFilteredNodes(node, {
        filterField: filterField,
        filterValue: filterValue,
        filterConstraint: filterConstraint,
        isStrictMode: isStrictMode
      }) || matched;
    }
    return matched;
  };
  var isNodeLeaf = function isNodeLeaf(node) {
    return node.leaf === false ? false : !(node.children && node.children.length);
  };
  var processData = function processData() {
    var data = props.value || [];
    if (!props.lazy) {
      if (data && data.length) {
        var filters = getFilters();
        var sortField = getSortField();
        var multiSortMeta = getMultiSortMeta();
        if (ObjectUtils.isNotEmpty(filters) || props.globalFilter) {
          data = filterLocal(data);
        }
        if (sortField || ObjectUtils.isNotEmpty(multiSortMeta)) {
          if (props.sortMode === 'single') data = sortSingle(data);else if (props.sortMode === 'multiple') data = sortMultiple(data);
        }
      }
    }
    return data;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      filter: filter,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var createTableHeader = function createTableHeader(columns, columnGroup) {
    var sortField = getSortField();
    var sortOrder = getSortOrder();
    var multiSortMeta = _toConsumableArray(getMultiSortMeta());
    var filters = getFilters();
    return /*#__PURE__*/React.createElement(TreeTableHeader, {
      columns: columns,
      columnGroup: columnGroup,
      tabIndex: props.tabIndex,
      onSort: onSort,
      sortField: sortField,
      sortOrder: sortOrder,
      multiSortMeta: multiSortMeta,
      resizableColumns: props.resizableColumns,
      onResizeStart: onColumnResizeStart,
      reorderableColumns: props.reorderableColumns,
      onDragStart: onColumnDragStart,
      onDragOver: onColumnDragOver,
      onDragLeave: onColumnDragLeave,
      onDrop: onColumnDrop,
      onFilter: onFilter,
      filters: filters,
      filterDelay: props.filterDelay
    });
  };
  var createTableFooter = function createTableFooter(columns, columnGroup) {
    return /*#__PURE__*/React.createElement(TreeTableFooter, {
      columns: columns,
      columnGroup: columnGroup
    });
  };
  var createTableBody = function createTableBody(value, columns) {
    return /*#__PURE__*/React.createElement(TreeTableBody, {
      value: value,
      columns: columns,
      expandedKeys: getExpandedKeys(),
      selectOnEdit: props.selectOnEdit,
      onToggle: onToggle,
      onExpand: props.onExpand,
      onCollapse: props.onCollapse,
      paginator: props.paginator,
      first: getFirst(),
      rows: getRows(),
      selectionMode: props.selectionMode,
      selectionKeys: props.selectionKeys,
      onSelectionChange: props.onSelectionChange,
      metaKeySelection: props.metaKeySelection,
      onRowClick: props.onRowClick,
      onSelect: props.onSelect,
      onUnselect: props.onUnselect,
      propagateSelectionUp: props.propagateSelectionUp,
      propagateSelectionDown: props.propagateSelectionDown,
      lazy: props.lazy,
      rowClassName: props.rowClassName,
      emptyMessage: props.emptyMessage,
      loading: props.loading,
      contextMenuSelectionKey: props.contextMenuSelectionKey,
      onContextMenuSelectionChange: props.onContextMenuSelectionChange,
      onContextMenu: props.onContextMenu
    });
  };
  var createPaginator = function createPaginator(position, totalRecords) {
    var className = classNames('p-paginator-' + position, props.paginatorClassName);
    return /*#__PURE__*/React.createElement(Paginator, {
      first: getFirst(),
      rows: getRows(),
      pageLinkSize: props.pageLinkSize,
      className: className,
      onPageChange: onPageChange,
      template: props.paginatorTemplate,
      totalRecords: totalRecords,
      rowsPerPageOptions: props.rowsPerPageOptions,
      currentPageReportTemplate: props.currentPageReportTemplate,
      leftContent: props.paginatorLeft,
      rightContent: props.paginatorRight,
      alwaysShow: props.alwaysShowPaginator,
      dropdownAppendTo: props.paginatorDropdownAppendTo
    });
  };
  var createScrollableView = function createScrollableView(value, columns, frozen, headerColumnGroup, footerColumnGroup) {
    var header = createTableHeader(columns, headerColumnGroup);
    var footer = createTableFooter(columns, footerColumnGroup);
    var body = createTableBody(value, columns);
    return /*#__PURE__*/React.createElement(TreeTableScrollableView, {
      columns: columns,
      header: header,
      body: body,
      footer: footer,
      scrollHeight: props.scrollHeight,
      frozen: frozen,
      frozenWidth: props.frozenWidth
    });
  };
  var createScrollableTable = function createScrollableTable(value) {
    var columns = getColumns();
    var frozenColumns = getFrozenColumns(columns);
    var scrollableColumns = frozenColumns ? getScrollableColumns(columns) : columns;
    var frozenView, scrollableView;
    if (frozenColumns) {
      frozenView = createScrollableView(value, frozenColumns, true, props.frozenHeaderColumnGroup, props.frozenFooterColumnGroup);
    }
    scrollableView = createScrollableView(value, scrollableColumns, false, props.headerColumnGroup, props.footerColumnGroup);
    return /*#__PURE__*/React.createElement("div", {
      className: "p-treetable-scrollable-wrapper"
    }, frozenView, scrollableView);
  };
  var createRegularTable = function createRegularTable(value) {
    var columns = getColumns();
    var header = createTableHeader(columns, props.headerColumnGroup);
    var footer = createTableFooter(columns, props.footerColumnGroup);
    var body = createTableBody(value, columns);
    return /*#__PURE__*/React.createElement("div", {
      className: "p-treetable-wrapper"
    }, /*#__PURE__*/React.createElement("table", {
      style: props.tableStyle,
      className: props.tableClassName
    }, header, footer, body));
  };
  var createTable = function createTable(value) {
    return props.scrollable ? createScrollableTable(value) : createRegularTable(value);
  };
  var createLoader = function createLoader() {
    if (props.loading) {
      var iconClassName = classNames('p-treetable-loading-icon pi-spin', props.loadingIcon);
      return /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-loading"
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-loading-overlay p-component-overlay"
      }, /*#__PURE__*/React.createElement("i", {
        className: iconClassName
      })));
    }
    return null;
  };
  var data = processData();
  var otherProps = ObjectUtils.findDiffKeys(props, TreeTable.defaultProps);
  var className = classNames('p-treetable p-component', {
    'p-treetable-hoverable-rows': props.rowHover,
    'p-treetable-selectable': isRowSelectionMode(),
    'p-treetable-resizable': props.resizableColumns,
    'p-treetable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
    'p-treetable-auto-layout': props.autoLayout,
    'p-treetable-striped': props.stripedRows,
    'p-treetable-gridlines': props.showGridlines
  }, props.className);
  var table = createTable(data);
  var totalRecords = getTotalRecords(data);
  var headerFacet = props.header && /*#__PURE__*/React.createElement("div", {
    className: "p-treetable-header"
  }, props.header);
  var footerFacet = props.footer && /*#__PURE__*/React.createElement("div", {
    className: "p-treetable-footer"
  }, props.footer);
  var paginatorTop = props.paginator && props.paginatorPosition !== 'bottom' && createPaginator('top', totalRecords);
  var paginatorBottom = props.paginator && props.paginatorPosition !== 'top' && createPaginator('bottom', totalRecords);
  var loader = createLoader();
  var resizeHelper = props.resizableColumns && /*#__PURE__*/React.createElement("div", {
    ref: resizerHelperRef,
    className: "p-column-resizer-helper",
    style: {
      display: 'none'
    }
  });
  var reorderIndicatorUp = props.reorderableColumns && /*#__PURE__*/React.createElement("span", {
    ref: reorderIndicatorUpRef,
    className: "pi pi-arrow-down p-datatable-reorder-indicator-up",
    style: {
      position: 'absolute',
      display: 'none'
    }
  });
  var reorderIndicatorDown = props.reorderableColumns && /*#__PURE__*/React.createElement("span", {
    ref: reorderIndicatorDownRef,
    className: "pi pi-arrow-up p-datatable-reorder-indicator-down",
    style: {
      position: 'absolute',
      display: 'none'
    }
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style,
    "data-scrollselectors": ".p-treetable-scrollable-body"
  }, otherProps), loader, headerFacet, paginatorTop, table, paginatorBottom, footerFacet, resizeHelper, reorderIndicatorUp, reorderIndicatorDown);
});
TreeTable.displayName = 'TreeTable';
TreeTable.defaultProps = {
  __TYPE: 'TreeTable',
  alwaysShowPaginator: true,
  autoLayout: false,
  className: null,
  columnResizeMode: 'fit',
  contextMenuSelectionKey: null,
  currentPageReportTemplate: '({currentPage} of {totalPages})',
  defaultSortOrder: 1,
  emptyMessage: null,
  expandedKeys: null,
  filterDelay: 300,
  filterLocale: undefined,
  filterMode: 'lenient',
  filters: null,
  first: null,
  footer: null,
  footerColumnGroup: null,
  frozenFooterColumnGroup: null,
  frozenHeaderColumnGroup: null,
  frozenWidth: null,
  globalFilter: null,
  globalFilterMatchMode: FilterMatchMode.CONTAINS,
  header: null,
  headerColumnGroup: null,
  id: null,
  lazy: false,
  loading: false,
  loadingIcon: 'pi pi-spinner',
  metaKeySelection: true,
  multiSortMeta: null,
  onColReorder: null,
  onCollapse: null,
  onColumnResizeEnd: null,
  onContextMenu: null,
  onContextMenuSelectionChange: null,
  onExpand: null,
  onFilter: null,
  onPage: null,
  onRowClick: null,
  onSelect: null,
  onSelectionChange: null,
  onSort: null,
  onToggle: null,
  onUnselect: null,
  pageLinkSize: 5,
  paginator: false,
  paginatorClassName: null,
  paginatorDropdownAppendTo: null,
  paginatorLeft: null,
  paginatorPosition: 'bottom',
  paginatorRight: null,
  paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
  propagateSelectionDown: true,
  propagateSelectionUp: true,
  removableSort: false,
  reorderableColumns: false,
  resizableColumns: false,
  rowClassName: null,
  rowHover: false,
  rows: null,
  rowsPerPageOptions: null,
  scrollHeight: null,
  scrollable: false,
  selectOnEdit: true,
  selectionKeys: null,
  selectionMode: null,
  showGridlines: false,
  sortField: null,
  sortMode: 'single',
  sortOrder: null,
  stripedRows: false,
  style: null,
  tabIndex: 0,
  tableClassName: null,
  tableStyle: null,
  totalRecords: null,
  value: null
};

export { TreeTable };
