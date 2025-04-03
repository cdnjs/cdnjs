'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { classNames, IconUtils, ObjectUtils, DomHandler } from 'primereact/utils';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronUpIcon } from 'primereact/icons/chevronup';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var styles = "\n@layer primereact {\n    .p-organizationchart-table {\n        border-spacing: 0;\n        border-collapse: separate;\n        margin: 0 auto;\n    }\n    \n    .p-organizationchart-table > tbody > tr > td {\n        text-align: center;\n        vertical-align: top;\n        padding: 0 .75rem;\n    }\n    \n    .p-organizationchart-node-content {\n        display: inline-block;\n        position: relative;\n    }\n    \n    .p-organizationchart-node-content .p-node-toggler {\n        position: absolute;\n        bottom: -.75rem;\n        margin-left: -.75rem;\n        z-index: 2;\n        left: 50%;\n        user-select: none;\n        cursor: pointer;\n        width: 1.5rem;\n        height: 1.5rem;\n        text-decoration: none;\n    }\n    \n    .p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon {\n        position: relative;\n        top: .25rem;\n    }\n    \n    .p-organizationchart-line-down {\n        margin: 0 auto;\n        height: 20px;\n        width: 1px;\n    }\n    \n    .p-organizationchart-line-right {\n        border-radius: 0px;\n    }\n    \n     .p-organizationchart-line-left {\n        border-radius: 0;\n    }\n    \n    .p-organizationchart-selectable-node {\n        cursor: pointer;\n    }\n}\n";
var classes = {
  root: 'p-organizationchart p-component',
  table: 'p-organizationchart-table',
  node: function node(_ref) {
    var props = _ref.nodeProps,
      _node = _ref.node,
      selected = _ref.selected;
    return classNames('p-organizationchart-node-content', {
      'p-organizationchart-selectable-node': props.selectionMode && _node.selectable !== false,
      'p-highlight': selected
    }, _node.className);
  },
  nodes: 'p-organizationchart-nodes',
  lines: 'p-organizationchart-lines',
  lineLeft: function lineLeft(_ref2) {
    var index = _ref2.index;
    return classNames('p-organizationchart-line-left', {
      'p-organizationchart-line-top': index !== 0
    });
  },
  lineRight: function lineRight(_ref3) {
    var index = _ref3.index,
      nodeChildLength = _ref3.nodeChildLength;
    return classNames('p-organizationchart-line-right', {
      'p-organizationchart-line-top': index !== nodeChildLength - 1
    });
  },
  lineDown: 'p-organizationchart-line-down',
  nodeTogglerIcon: 'p-node-toggler-icon',
  nodeToggler: 'p-node-toggler'
};
var OrganizationChartBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'OrganizationChart',
    id: null,
    value: null,
    style: null,
    className: null,
    selectionMode: null,
    selection: null,
    nodeTemplate: null,
    onSelectionChange: null,
    onNodeSelect: null,
    onNodeUnselect: null,
    togglerIcon: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var OrganizationChartNode = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var node = props.node;
  var _React$useState = React.useState(node.expanded),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    expandedState = _React$useState2[0],
    setExpandedState = _React$useState2[1];
  var leaf = node.leaf === false ? false : !(node.children && node.children.length);
  var colspan = node.children && node.children.length ? node.children.length * 2 : null;
  var selected = props.isSelected(node);
  var visibility = !leaf && expandedState ? 'inherit' : 'hidden';
  var ptm = props.ptm,
    cx = props.cx,
    sx = props.sx;
  var _ptm = function _ptm(key, options) {
    return ptm(key, _objectSpread({
      hostName: props.hostName
    }, options));
  };
  var getPTOptions = function getPTOptions(key) {
    return _ptm(key, {
      state: {
        expanded: expandedState
      },
      context: {
        selected: props.isSelected(node)
      }
    });
  };
  var getNodePTOptions = function getNodePTOptions(lineTop, key) {
    return _ptm(key, {
      context: {
        lineTop: lineTop
      }
    });
  };
  var onNodeClick = function onNodeClick(event, node) {
    props.onNodeClick(event, node);
  };
  var toggleNode = function toggleNode(event, node) {
    setExpandedState(function (prevExpanded) {
      return !prevExpanded;
    });
    event.preventDefault();
  };
  var _onKeyDown = function onKeyDown(event, node) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
      toggleNode(event);
      event.preventDefault();
    }
  };
  var createChildNodes = function createChildNodes() {
    var nodesProps = mergeProps({
      className: cx('nodes'),
      style: {
        visibility: visibility
      }
    }, _ptm('nodes'));
    var nodeCellProps = mergeProps({
      colSpan: '2'
    }, _ptm('nodeCell'));
    return /*#__PURE__*/React.createElement("tr", nodesProps, node.children && node.children.map(function (child, index) {
      return /*#__PURE__*/React.createElement("td", _extends({
        key: index
      }, nodeCellProps), /*#__PURE__*/React.createElement(OrganizationChartNode, {
        node: child,
        nodeTemplate: props.nodeTemplate,
        selectionMode: props.selectionMode,
        onNodeClick: props.onNodeClick,
        isSelected: props.isSelected,
        togglerIcon: props.togglerIcon,
        ptm: ptm,
        cx: cx,
        sx: sx
      }));
    }));
  };
  var createLinesMiddle = function createLinesMiddle() {
    var nodeChildLength = node.children && node.children.length;
    var linesProps = mergeProps({
      className: cx('lines'),
      style: {
        visibility: visibility
      }
    }, _ptm('lines'));
    var lineCellProps = mergeProps({
      colSpan: colspan
    }, _ptm('lineCell'));
    var lineDownProps = mergeProps({
      className: cx('lineDown')
    }, _ptm('lineDown'));
    return /*#__PURE__*/React.createElement("tr", linesProps, node.children && node.children.length === 1 && /*#__PURE__*/React.createElement("td", lineCellProps, /*#__PURE__*/React.createElement("div", lineDownProps)), node.children && node.children.length > 1 && node.children.map(function (_, index) {
      var lineLeftProps = mergeProps({
        className: cx('lineLeft', {
          index: index
        })
      }, getNodePTOptions(index !== 0, 'lineLeft'));
      var lineRightProps = mergeProps({
        className: cx('lineRight', {
          index: index,
          nodeChildLength: nodeChildLength
        })
      }, getNodePTOptions(index !== nodeChildLength - 1, 'lineRight'));
      return [/*#__PURE__*/React.createElement("td", _extends({
        key: index + '_lineleft'
      }, lineLeftProps), "\xA0"), /*#__PURE__*/React.createElement("td", _extends({
        key: index + '_lineright'
      }, lineRightProps), "\xA0")];
    }));
  };
  var createLinesDown = function createLinesDown() {
    var linesProps = mergeProps({
      className: cx('lines'),
      style: {
        visibility: visibility
      }
    }, _ptm('lines'));
    var lineCellProps = mergeProps({
      colSpan: colspan
    }, _ptm('lineCell'));
    var lineDownProps = mergeProps({
      className: cx('lineDown')
    }, _ptm('lineDown'));
    return /*#__PURE__*/React.createElement("tr", linesProps, /*#__PURE__*/React.createElement("td", lineCellProps, /*#__PURE__*/React.createElement("div", lineDownProps)));
  };
  var createToggler = function createToggler() {
    if (!leaf) {
      var nodeTogglerIconProps = mergeProps({
        className: cx('nodeTogglerIcon')
      }, _ptm('nodeTogglerIcon'));
      var icon;
      if (expandedState) {
        icon = props.togglerIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, nodeTogglerIconProps);
      } else {
        icon = props.togglerIcon || /*#__PURE__*/React.createElement(ChevronUpIcon, nodeTogglerIconProps);
      }
      var togglerIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, nodeTogglerIconProps), {
        props: props
      });
      var nodeTogglerProps = mergeProps({
        className: cx('nodeToggler'),
        tabIndex: 0,
        onKeyDown: function onKeyDown(e) {
          return _onKeyDown(e);
        },
        onClick: function onClick(e) {
          return toggleNode(e);
        },
        href: '#'
      }, getPTOptions('nodeToggler'));
      return /*#__PURE__*/ /* eslint-disable */React.createElement("a", nodeTogglerProps, /*#__PURE__*/React.createElement("i", null, " ", togglerIcon, " "))
      /* eslint-enable */;
    }
    return null;
  };
  var createNodeLabel = function createNodeLabel() {
    var label = props.nodeTemplate && ObjectUtils.getJSXElement(props.nodeTemplate, node) || node.label;
    return /*#__PURE__*/React.createElement("div", null, label);
  };
  var createNodeContent = function createNodeContent() {
    var label = createNodeLabel();
    var toggler = createToggler();
    var cellProps = mergeProps({
      colSpan: colspan
    }, _ptm('cell'));
    var nodeProps = mergeProps({
      className: cx('node', {
        selected: selected,
        node: node,
        nodeProps: props
      }),
      style: node.style,
      onClick: function onClick(e) {
        return onNodeClick(e, node);
      }
    }, getPTOptions('node'));
    var rowProps = mergeProps(_ptm('row'));
    return /*#__PURE__*/React.createElement("tr", rowProps, /*#__PURE__*/React.createElement("td", cellProps, /*#__PURE__*/React.createElement("div", nodeProps, label, toggler)));
  };
  var nodeContent = createNodeContent();
  var linesDown = createLinesDown();
  var linesMiddle = createLinesMiddle();
  var childNodes = createChildNodes();
  var tableProps = mergeProps({
    className: cx('table')
  }, _ptm('table'));
  return /*#__PURE__*/React.createElement("table", tableProps, /*#__PURE__*/React.createElement("tbody", null, nodeContent, linesDown, linesMiddle, childNodes));
});
OrganizationChartNode.displayName = 'OrganizationChartNode';

var OrganizationChart = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = OrganizationChartBase.getProps(inProps, context);
  var _OrganizationChartBas = OrganizationChartBase.setMetaData({
      props: props
    }),
    ptm = _OrganizationChartBas.ptm,
    cx = _OrganizationChartBas.cx,
    sx = _OrganizationChartBas.sx,
    isUnstyled = _OrganizationChartBas.isUnstyled;
  useHandleStyle(OrganizationChartBase.css.styles, isUnstyled, {
    name: 'orgchart'
  });
  var elementRef = React.useRef(null);
  var root = props.value && props.value.length ? props.value[0] : null;
  var onNodeClick = function onNodeClick(event, node) {
    if (props.selectionMode) {
      var target = event.target;
      if (node.selectable === false || DomHandler.hasClass(target, 'p-node-toggler') || DomHandler.hasClass(target, 'p-node-toggler-icon')) {
        return;
      }
      var index = findIndexInSelection(node);
      var selected = index >= 0;
      var selection;
      if (props.selectionMode === 'single') {
        if (selected) {
          selection = null;
          props.onNodeUnselect && props.onNodeUnselect({
            originalEvent: event,
            node: node
          });
        } else {
          selection = node;
          props.onNodeSelect && props.onNodeSelect({
            originalEvent: event,
            node: node
          });
        }
      } else if (props.selectionMode === 'multiple') {
        if (selected) {
          selection = props.selection.filter(function (_, i) {
            return i !== index;
          });
          props.onNodeUnselect && props.onNodeUnselect({
            originalEvent: event,
            node: node
          });
        } else {
          selection = [].concat(_toConsumableArray(props.selection || []), [node]);
          props.onNodeSelect && props.onNodeSelect({
            originalEvent: event,
            node: node
          });
        }
      }
      if (props.onSelectionChange) {
        props.onSelectionChange({
          originalEvent: event,
          data: selection
        });
      }
    }
  };
  var findIndexInSelection = function findIndexInSelection(node) {
    if (props.selectionMode && props.selection) {
      if (props.selectionMode === 'single') {
        return props.selection === node ? 0 : -1;
      } else if (props.selectionMode === 'multiple') {
        return props.selection.findIndex(function (selectedNode) {
          return selectedNode === node;
        });
      }
    }
    return -1;
  };
  var isSelected = function isSelected(node) {
    return findIndexInSelection(node) !== -1;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: classNames(props.className, cx('root'))
  }, OrganizationChartBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(OrganizationChartNode, {
    hostName: "OrganizationChart",
    node: root,
    nodeTemplate: props.nodeTemplate,
    selectionMode: props.selectionMode,
    onNodeClick: onNodeClick,
    isSelected: isSelected,
    togglerIcon: props.togglerIcon,
    ptm: ptm,
    cx: cx,
    sx: sx
  }));
}));
OrganizationChart.displayName = 'OrganizationChart';

export { OrganizationChart };
