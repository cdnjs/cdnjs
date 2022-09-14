import { _ as _slicedToArray, a as _defineProperty, P as Position, C as ConnectionMode, g as getHostForElement, u as useStoreApi, b as useStore, c as addEdge, d as getMarkerId, i as internalsSymbol, r as rectToBox, e as getConnectedEdges, f as getDimensions, h as PanOnScrollMode, j as clamp, k as getNodesInside, l as getSelectionChanges, m as clampPosition, p as pointToRendererPoint, n as handleNodeClick, o as getRectOfNodes, q as ConnectionLineType, M as MarkerType, s as isNumeric, t as getMouseHandler$1, v as Provider$1, w as createStore, x as infiniteExtent, y as applyNodeChanges, z as applyEdgeChanges } from './index-a12c80bd.js';
export { H as BackgroundVariant, q as ConnectionLineType, C as ConnectionMode, M as MarkerType, h as PanOnScrollMode, P as Position, c as addEdge, z as applyEdgeChanges, y as applyNodeChanges, e as getConnectedEdges, E as getIncomers, D as getOutgoers, o as getRectOfNodes, G as getTransformForBounds, i as internalsSymbol, B as isEdge, A as isNode, F as updateEdge, b as useStore, u as useStoreApi } from './index-a12c80bd.js';
import { _ as _objectWithoutProperties } from './index-20df97c0.js';
export { C as ControlButton, i as Controls } from './index-20df97c0.js';
import React, { memo, useRef, useState, useEffect, createContext, forwardRef, useContext, useMemo, useCallback } from 'react';
import cc from 'classcat';
import { _ as _toConsumableArray, u as useReactFlow } from './useReactFlow-993c30ca.js';
export { u as useReactFlow } from './useReactFlow-993c30ca.js';
import shallow from 'zustand/shallow';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select, pointer } from 'd3-selection';
import { drag } from 'd3-drag';
export { default as MiniMap } from './index2.js';
export { default as Background } from './index3.js';
export { default as useUpdateNodeInternals } from './useUpdateNodeInternals.js';
export { default as useNodes } from './useNodes.js';
export { default as useEdges } from './useEdges.js';
export { default as useViewport } from './useViewport.js';
import 'zustand';
import 'zustand/context';

var accounts = ['paid-pro', 'paid-sponsor', 'paid-enterprise', 'paid-custom'];

function Attribution(_ref) {
  var proOptions = _ref.proOptions,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'bottom-right' : _ref$position;

  if (proOptions !== null && proOptions !== void 0 && proOptions.account && accounts.includes(proOptions === null || proOptions === void 0 ? void 0 : proOptions.account) && proOptions !== null && proOptions !== void 0 && proOptions.hideAttribution) {
    return null;
  }

  var positionClasses = "".concat(position).split('-');
  return /*#__PURE__*/React.createElement("div", {
    className: cc(['react-flow__attribution'].concat(_toConsumableArray(positionClasses))),
    "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev/pricing"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://reactflow.dev",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "React Flow"));
}

var _excluded$2 = ["x", "y", "label", "labelStyle", "labelShowBg", "labelBgStyle", "labelBgPadding", "labelBgBorderRadius", "children", "className"];

function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var EdgeText = function EdgeText(_ref) {
  var x = _ref.x,
      y = _ref.y,
      label = _ref.label,
      _ref$labelStyle = _ref.labelStyle,
      labelStyle = _ref$labelStyle === void 0 ? {} : _ref$labelStyle,
      _ref$labelShowBg = _ref.labelShowBg,
      labelShowBg = _ref$labelShowBg === void 0 ? true : _ref$labelShowBg,
      _ref$labelBgStyle = _ref.labelBgStyle,
      labelBgStyle = _ref$labelBgStyle === void 0 ? {} : _ref$labelBgStyle,
      _ref$labelBgPadding = _ref.labelBgPadding,
      labelBgPadding = _ref$labelBgPadding === void 0 ? [2, 4] : _ref$labelBgPadding,
      _ref$labelBgBorderRad = _ref.labelBgBorderRadius,
      labelBgBorderRadius = _ref$labelBgBorderRad === void 0 ? 2 : _ref$labelBgBorderRad,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded$2);

  var edgeRef = useRef(null);

  var _useState = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      edgeTextBbox = _useState2[0],
      setEdgeTextBbox = _useState2[1];

  var edgeTextClasses = cc(['react-flow__edge-textwrapper', className]);
  useEffect(function () {
    if (edgeRef.current) {
      var textBbox = edgeRef.current.getBBox();
      setEdgeTextBbox({
        x: textBbox.x,
        y: textBbox.y,
        width: textBbox.width,
        height: textBbox.height
      });
    }
  }, [label]);

  if (typeof label === 'undefined' || !label) {
    return null;
  }

  return /*#__PURE__*/React.createElement("g", _objectSpread$c({
    transform: "translate(".concat(x - edgeTextBbox.width / 2, " ").concat(y - edgeTextBbox.height / 2, ")"),
    className: edgeTextClasses
  }, rest), labelShowBg && /*#__PURE__*/React.createElement("rect", {
    width: edgeTextBbox.width + 2 * labelBgPadding[0],
    x: -labelBgPadding[0],
    y: -labelBgPadding[1],
    height: edgeTextBbox.height + 2 * labelBgPadding[1],
    className: "react-flow__edge-textbg",
    style: labelBgStyle,
    rx: labelBgBorderRadius,
    ry: labelBgBorderRadius
  }), /*#__PURE__*/React.createElement("text", {
    className: "react-flow__edge-text",
    y: edgeTextBbox.height / 2,
    dy: "0.3em",
    ref: edgeRef,
    style: labelStyle
  }, label), children);
};

var EdgeText$1 = /*#__PURE__*/memo(EdgeText);

var BaseEdge = (function (_ref) {
  var path = _ref.path,
      centerX = _ref.centerX,
      centerY = _ref.centerY,
      label = _ref.label,
      labelStyle = _ref.labelStyle,
      labelShowBg = _ref.labelShowBg,
      labelBgStyle = _ref.labelBgStyle,
      labelBgPadding = _ref.labelBgPadding,
      labelBgBorderRadius = _ref.labelBgBorderRadius,
      style = _ref.style,
      markerEnd = _ref.markerEnd,
      markerStart = _ref.markerStart;
  var text = label ? /*#__PURE__*/React.createElement(EdgeText$1, {
    x: centerX,
    y: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius
  }) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    style: style,
    d: path,
    className: "react-flow__edge-path",
    markerEnd: markerEnd,
    markerStart: markerStart
  }), text);
});

function getControl(_ref) {
  var pos = _ref.pos,
      x1 = _ref.x1,
      y1 = _ref.y1,
      x2 = _ref.x2,
      y2 = _ref.y2;
  var ctX, ctY;

  switch (pos) {
    case Position.Left:
    case Position.Right:
      {
        ctX = 0.5 * (x1 + x2);
        ctY = y1;
      }
      break;

    case Position.Top:
    case Position.Bottom:
      {
        ctX = x1;
        ctY = 0.5 * (y1 + y2);
      }
      break;
  }

  return [ctX, ctY];
}

function getSimpleBezierPath(_ref2) {
  var sourceX = _ref2.sourceX,
      sourceY = _ref2.sourceY,
      _ref2$sourcePosition = _ref2.sourcePosition,
      sourcePosition = _ref2$sourcePosition === void 0 ? Position.Bottom : _ref2$sourcePosition,
      targetX = _ref2.targetX,
      targetY = _ref2.targetY,
      _ref2$targetPosition = _ref2.targetPosition,
      targetPosition = _ref2$targetPosition === void 0 ? Position.Top : _ref2$targetPosition;

  var _getControl = getControl({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY
  }),
      _getControl2 = _slicedToArray(_getControl, 2),
      sourceControlX = _getControl2[0],
      sourceControlY = _getControl2[1];

  var _getControl3 = getControl({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY
  }),
      _getControl4 = _slicedToArray(_getControl3, 2),
      targetControlX = _getControl4[0],
      targetControlY = _getControl4[1];

  return "M".concat(sourceX, ",").concat(sourceY, " C").concat(sourceControlX, ",").concat(sourceControlY, " ").concat(targetControlX, ",").concat(targetControlY, " ").concat(targetX, ",").concat(targetY);
} // @TODO: this function will recalculate the control points
// one option is to let getXXXPath() return center points
// but will introduce breaking changes
// the getCenter() of other types of edges might need to change, too

function getSimpleBezierCenter(_ref3) {
  var sourceX = _ref3.sourceX,
      sourceY = _ref3.sourceY,
      _ref3$sourcePosition = _ref3.sourcePosition,
      sourcePosition = _ref3$sourcePosition === void 0 ? Position.Bottom : _ref3$sourcePosition,
      targetX = _ref3.targetX,
      targetY = _ref3.targetY,
      _ref3$targetPosition = _ref3.targetPosition,
      targetPosition = _ref3$targetPosition === void 0 ? Position.Top : _ref3$targetPosition;

  var _getControl5 = getControl({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY
  }),
      _getControl6 = _slicedToArray(_getControl5, 2),
      sourceControlX = _getControl6[0],
      sourceControlY = _getControl6[1];

  var _getControl7 = getControl({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY
  }),
      _getControl8 = _slicedToArray(_getControl7, 2),
      targetControlX = _getControl8[0],
      targetControlY = _getControl8[1]; // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
  // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve


  var centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
  var centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
  var xOffset = Math.abs(centerX - sourceX);
  var yOffset = Math.abs(centerY - sourceY);
  return [centerX, centerY, xOffset, yOffset];
}
var SimpleBezierEdge = /*#__PURE__*/memo(function (_ref4) {
  var sourceX = _ref4.sourceX,
      sourceY = _ref4.sourceY,
      targetX = _ref4.targetX,
      targetY = _ref4.targetY,
      _ref4$sourcePosition = _ref4.sourcePosition,
      sourcePosition = _ref4$sourcePosition === void 0 ? Position.Bottom : _ref4$sourcePosition,
      _ref4$targetPosition = _ref4.targetPosition,
      targetPosition = _ref4$targetPosition === void 0 ? Position.Top : _ref4$targetPosition,
      label = _ref4.label,
      labelStyle = _ref4.labelStyle,
      labelShowBg = _ref4.labelShowBg,
      labelBgStyle = _ref4.labelBgStyle,
      labelBgPadding = _ref4.labelBgPadding,
      labelBgBorderRadius = _ref4.labelBgBorderRadius,
      style = _ref4.style,
      markerEnd = _ref4.markerEnd,
      markerStart = _ref4.markerStart;
  var params = {
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition
  };
  var path = getSimpleBezierPath(params);

  var _getSimpleBezierCente = getSimpleBezierCenter(params),
      _getSimpleBezierCente2 = _slicedToArray(_getSimpleBezierCente, 2),
      centerX = _getSimpleBezierCente2[0],
      centerY = _getSimpleBezierCente2[1];

  return /*#__PURE__*/React.createElement(BaseEdge, {
    path: path,
    centerX: centerX,
    centerY: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart
  });
});

function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var getMarkerEnd = function getMarkerEnd(markerType, markerEndId) {
  if (typeof markerEndId !== 'undefined' && markerEndId) {
    return "url(#".concat(markerEndId, ")");
  }

  return typeof markerType !== 'undefined' ? "url(#react-flow__".concat(markerType, ")") : 'none';
};
var LeftOrRight = [Position.Left, Position.Right];
var getCenter = function getCenter(_ref) {
  var sourceX = _ref.sourceX,
      sourceY = _ref.sourceY,
      targetX = _ref.targetX,
      targetY = _ref.targetY,
      _ref$sourcePosition = _ref.sourcePosition,
      sourcePosition = _ref$sourcePosition === void 0 ? Position.Bottom : _ref$sourcePosition,
      _ref$targetPosition = _ref.targetPosition,
      targetPosition = _ref$targetPosition === void 0 ? Position.Top : _ref$targetPosition;
  var sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
  var targetIsLeftOrRight = LeftOrRight.includes(targetPosition); // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
  // a mixed edge is when one the source is on the left and the target is on the top for example.

  var mixedEdge = sourceIsLeftOrRight && !targetIsLeftOrRight || targetIsLeftOrRight && !sourceIsLeftOrRight;

  if (mixedEdge) {
    var _xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0;

    var _centerX = sourceX > targetX ? sourceX - _xOffset : sourceX + _xOffset;

    var _yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY);

    var _centerY = sourceY < targetY ? sourceY + _yOffset : sourceY - _yOffset;

    return [_centerX, _centerY, _xOffset, _yOffset];
  }

  var xOffset = Math.abs(targetX - sourceX) / 2;
  var centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
  var yOffset = Math.abs(targetY - sourceY) / 2;
  var centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
  return [centerX, centerY, xOffset, yOffset];
};
function getMouseHandler(id, getState, handler) {
  return handler === undefined ? handler : function (event) {
    var edge = getState().edges.find(function (e) {
      return e.id === id;
    });
    handler(event, _objectSpread$b({}, edge));
  };
}

// The name indicates the direction of the path. "bottomLeftCorner" goes
// from bottom to the left and "leftBottomCorner" goes from left to the bottom.
// We have to consider the direction of the paths because of the animated lines.

var bottomLeftCorner = function bottomLeftCorner(x, y, size) {
  return "L ".concat(x, ",").concat(y - size, "Q ").concat(x, ",").concat(y, " ").concat(x + size, ",").concat(y);
};

var leftBottomCorner = function leftBottomCorner(x, y, size) {
  return "L ".concat(x + size, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y - size);
};

var bottomRightCorner = function bottomRightCorner(x, y, size) {
  return "L ".concat(x, ",").concat(y - size, "Q ").concat(x, ",").concat(y, " ").concat(x - size, ",").concat(y);
};

var rightBottomCorner = function rightBottomCorner(x, y, size) {
  return "L ".concat(x - size, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y - size);
};

var leftTopCorner = function leftTopCorner(x, y, size) {
  return "L ".concat(x + size, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y + size);
};

var topLeftCorner = function topLeftCorner(x, y, size) {
  return "L ".concat(x, ",").concat(y + size, "Q ").concat(x, ",").concat(y, " ").concat(x + size, ",").concat(y);
};

var topRightCorner = function topRightCorner(x, y, size) {
  return "L ".concat(x, ",").concat(y + size, "Q ").concat(x, ",").concat(y, " ").concat(x - size, ",").concat(y);
};

var rightTopCorner = function rightTopCorner(x, y, size) {
  return "L ".concat(x - size, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y + size);
};

function getSmoothStepPath(_ref) {
  var sourceX = _ref.sourceX,
      sourceY = _ref.sourceY,
      _ref$sourcePosition = _ref.sourcePosition,
      sourcePosition = _ref$sourcePosition === void 0 ? Position.Bottom : _ref$sourcePosition,
      targetX = _ref.targetX,
      targetY = _ref.targetY,
      _ref$targetPosition = _ref.targetPosition,
      targetPosition = _ref$targetPosition === void 0 ? Position.Top : _ref$targetPosition,
      _ref$borderRadius = _ref.borderRadius,
      borderRadius = _ref$borderRadius === void 0 ? 5 : _ref$borderRadius,
      centerX = _ref.centerX,
      centerY = _ref.centerY;

  var _getCenter = getCenter({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY
  }),
      _getCenter2 = _slicedToArray(_getCenter, 4),
      _centerX = _getCenter2[0],
      _centerY = _getCenter2[1],
      offsetX = _getCenter2[2],
      offsetY = _getCenter2[3];

  var cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
  var cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
  var cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);
  var leftAndRight = [Position.Left, Position.Right];
  var cX = typeof centerX !== 'undefined' ? centerX : _centerX;
  var cY = typeof centerY !== 'undefined' ? centerY : _centerY;
  var firstCornerPath = null;
  var secondCornerPath = null;

  if (sourceX <= targetX) {
    firstCornerPath = sourceY <= targetY ? bottomLeftCorner(sourceX, cY, cornerSize) : topLeftCorner(sourceX, cY, cornerSize);
    secondCornerPath = sourceY <= targetY ? rightTopCorner(targetX, cY, cornerSize) : rightBottomCorner(targetX, cY, cornerSize);
  } else {
    firstCornerPath = sourceY < targetY ? bottomRightCorner(sourceX, cY, cornerSize) : topRightCorner(sourceX, cY, cornerSize);
    secondCornerPath = sourceY < targetY ? leftTopCorner(targetX, cY, cornerSize) : leftBottomCorner(targetX, cY, cornerSize);
  }

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? rightTopCorner(cX, sourceY, cornerSize) : rightBottomCorner(cX, sourceY, cornerSize);
      secondCornerPath = sourceY <= targetY ? bottomLeftCorner(cX, targetY, cornerSize) : topLeftCorner(cX, targetY, cornerSize);
    } else if (sourcePosition === Position.Right && targetPosition === Position.Left || sourcePosition === Position.Left && targetPosition === Position.Right || sourcePosition === Position.Left && targetPosition === Position.Left) {
      // and sourceX > targetX
      firstCornerPath = sourceY <= targetY ? leftTopCorner(cX, sourceY, cornerSize) : leftBottomCorner(cX, sourceY, cornerSize);
      secondCornerPath = sourceY <= targetY ? bottomRightCorner(cX, targetY, cornerSize) : topRightCorner(cX, targetY, cornerSize);
    }
  } else if (leftAndRight.includes(sourcePosition) && !leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? rightTopCorner(targetX, sourceY, cornerSize) : rightBottomCorner(targetX, sourceY, cornerSize);
    } else {
      firstCornerPath = sourceY <= targetY ? leftTopCorner(targetX, sourceY, cornerSize) : leftBottomCorner(targetX, sourceY, cornerSize);
    }

    secondCornerPath = '';
  } else if (!leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? bottomLeftCorner(sourceX, targetY, cornerSize) : topLeftCorner(sourceX, targetY, cornerSize);
    } else {
      firstCornerPath = sourceY <= targetY ? bottomRightCorner(sourceX, targetY, cornerSize) : topRightCorner(sourceX, targetY, cornerSize);
    }

    secondCornerPath = '';
  }

  return "M ".concat(sourceX, ",").concat(sourceY).concat(firstCornerPath).concat(secondCornerPath, "L ").concat(targetX, ",").concat(targetY);
}
var SmoothStepEdge = /*#__PURE__*/memo(function (_ref2) {
  var sourceX = _ref2.sourceX,
      sourceY = _ref2.sourceY,
      targetX = _ref2.targetX,
      targetY = _ref2.targetY,
      label = _ref2.label,
      labelStyle = _ref2.labelStyle,
      labelShowBg = _ref2.labelShowBg,
      labelBgStyle = _ref2.labelBgStyle,
      labelBgPadding = _ref2.labelBgPadding,
      labelBgBorderRadius = _ref2.labelBgBorderRadius,
      style = _ref2.style,
      _ref2$sourcePosition = _ref2.sourcePosition,
      sourcePosition = _ref2$sourcePosition === void 0 ? Position.Bottom : _ref2$sourcePosition,
      _ref2$targetPosition = _ref2.targetPosition,
      targetPosition = _ref2$targetPosition === void 0 ? Position.Top : _ref2$targetPosition,
      markerEnd = _ref2.markerEnd,
      markerStart = _ref2.markerStart,
      _ref2$borderRadius = _ref2.borderRadius,
      borderRadius = _ref2$borderRadius === void 0 ? 5 : _ref2$borderRadius;

  var _getCenter3 = getCenter({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY,
    sourcePosition: sourcePosition,
    targetPosition: targetPosition
  }),
      _getCenter4 = _slicedToArray(_getCenter3, 2),
      centerX = _getCenter4[0],
      centerY = _getCenter4[1];

  var path = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition,
    borderRadius: borderRadius
  });
  return /*#__PURE__*/React.createElement(BaseEdge, {
    path: path,
    centerX: centerX,
    centerY: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart
  });
});

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StepEdge = /*#__PURE__*/memo(function (props) {
  return /*#__PURE__*/React.createElement(SmoothStepEdge, _objectSpread$a(_objectSpread$a({}, props), {}, {
    borderRadius: 0
  }));
});

var StraightEdge = /*#__PURE__*/memo(function (_ref) {
  var sourceX = _ref.sourceX,
      sourceY = _ref.sourceY,
      targetX = _ref.targetX,
      targetY = _ref.targetY,
      label = _ref.label,
      labelStyle = _ref.labelStyle,
      labelShowBg = _ref.labelShowBg,
      labelBgStyle = _ref.labelBgStyle,
      labelBgPadding = _ref.labelBgPadding,
      labelBgBorderRadius = _ref.labelBgBorderRadius,
      style = _ref.style,
      markerEnd = _ref.markerEnd,
      markerStart = _ref.markerStart;
  var yOffset = Math.abs(targetY - sourceY) / 2;
  var centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
  var xOffset = Math.abs(targetX - sourceX) / 2;
  var centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
  var path = "M ".concat(sourceX, ",").concat(sourceY, "L ").concat(targetX, ",").concat(targetY);
  return /*#__PURE__*/React.createElement(BaseEdge, {
    path: path,
    centerX: centerX,
    centerY: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart
  });
});

function calculateControlOffset(distance, curvature) {
  if (distance >= 0) {
    return 0.5 * distance;
  } else {
    return curvature * 25 * Math.sqrt(-distance);
  }
}

function getControlWithCurvature(_ref) {
  var pos = _ref.pos,
      x1 = _ref.x1,
      y1 = _ref.y1,
      x2 = _ref.x2,
      y2 = _ref.y2,
      c = _ref.c;
  var ctX, ctY;

  switch (pos) {
    case Position.Left:
      {
        ctX = x1 - calculateControlOffset(x1 - x2, c);
        ctY = y1;
      }
      break;

    case Position.Right:
      {
        ctX = x1 + calculateControlOffset(x2 - x1, c);
        ctY = y1;
      }
      break;

    case Position.Top:
      {
        ctX = x1;
        ctY = y1 - calculateControlOffset(y1 - y2, c);
      }
      break;

    case Position.Bottom:
      {
        ctX = x1;
        ctY = y1 + calculateControlOffset(y2 - y1, c);
      }
      break;
  }

  return [ctX, ctY];
}

function getBezierPath(_ref2) {
  var sourceX = _ref2.sourceX,
      sourceY = _ref2.sourceY,
      _ref2$sourcePosition = _ref2.sourcePosition,
      sourcePosition = _ref2$sourcePosition === void 0 ? Position.Bottom : _ref2$sourcePosition,
      targetX = _ref2.targetX,
      targetY = _ref2.targetY,
      _ref2$targetPosition = _ref2.targetPosition,
      targetPosition = _ref2$targetPosition === void 0 ? Position.Top : _ref2$targetPosition,
      _ref2$curvature = _ref2.curvature,
      curvature = _ref2$curvature === void 0 ? 0.25 : _ref2$curvature;

  var _getControlWithCurvat = getControlWithCurvature({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
    c: curvature
  }),
      _getControlWithCurvat2 = _slicedToArray(_getControlWithCurvat, 2),
      sourceControlX = _getControlWithCurvat2[0],
      sourceControlY = _getControlWithCurvat2[1];

  var _getControlWithCurvat3 = getControlWithCurvature({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
    c: curvature
  }),
      _getControlWithCurvat4 = _slicedToArray(_getControlWithCurvat3, 2),
      targetControlX = _getControlWithCurvat4[0],
      targetControlY = _getControlWithCurvat4[1];

  return "M".concat(sourceX, ",").concat(sourceY, " C").concat(sourceControlX, ",").concat(sourceControlY, " ").concat(targetControlX, ",").concat(targetControlY, " ").concat(targetX, ",").concat(targetY);
} // @TODO: this function will recalculate the control points
// one option is to let getXXXPath() return center points
// but will introduce breaking changes
// the getCenter() of other types of edges might need to change, too

function getBezierCenter(_ref3) {
  var sourceX = _ref3.sourceX,
      sourceY = _ref3.sourceY,
      _ref3$sourcePosition = _ref3.sourcePosition,
      sourcePosition = _ref3$sourcePosition === void 0 ? Position.Bottom : _ref3$sourcePosition,
      targetX = _ref3.targetX,
      targetY = _ref3.targetY,
      _ref3$targetPosition = _ref3.targetPosition,
      targetPosition = _ref3$targetPosition === void 0 ? Position.Top : _ref3$targetPosition,
      _ref3$curvature = _ref3.curvature,
      curvature = _ref3$curvature === void 0 ? 0.25 : _ref3$curvature;

  var _getControlWithCurvat5 = getControlWithCurvature({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
    c: curvature
  }),
      _getControlWithCurvat6 = _slicedToArray(_getControlWithCurvat5, 2),
      sourceControlX = _getControlWithCurvat6[0],
      sourceControlY = _getControlWithCurvat6[1];

  var _getControlWithCurvat7 = getControlWithCurvature({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
    c: curvature
  }),
      _getControlWithCurvat8 = _slicedToArray(_getControlWithCurvat7, 2),
      targetControlX = _getControlWithCurvat8[0],
      targetControlY = _getControlWithCurvat8[1]; // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
  // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve


  var centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
  var centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
  var xOffset = Math.abs(centerX - sourceX);
  var yOffset = Math.abs(centerY - sourceY);
  return [centerX, centerY, xOffset, yOffset];
}
var BezierEdge = /*#__PURE__*/memo(function (_ref4) {
  var sourceX = _ref4.sourceX,
      sourceY = _ref4.sourceY,
      targetX = _ref4.targetX,
      targetY = _ref4.targetY,
      _ref4$sourcePosition = _ref4.sourcePosition,
      sourcePosition = _ref4$sourcePosition === void 0 ? Position.Bottom : _ref4$sourcePosition,
      _ref4$targetPosition = _ref4.targetPosition,
      targetPosition = _ref4$targetPosition === void 0 ? Position.Top : _ref4$targetPosition,
      label = _ref4.label,
      labelStyle = _ref4.labelStyle,
      labelShowBg = _ref4.labelShowBg,
      labelBgStyle = _ref4.labelBgStyle,
      labelBgPadding = _ref4.labelBgPadding,
      labelBgBorderRadius = _ref4.labelBgBorderRadius,
      style = _ref4.style,
      markerEnd = _ref4.markerEnd,
      markerStart = _ref4.markerStart,
      curvature = _ref4.curvature;
  var params = {
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition,
    curvature: curvature
  };
  var path = getBezierPath(params);

  var _getBezierCenter = getBezierCenter(params),
      _getBezierCenter2 = _slicedToArray(_getBezierCenter, 2),
      centerX = _getBezierCenter2[0],
      centerY = _getBezierCenter2[1];

  return /*#__PURE__*/React.createElement(BaseEdge, {
    path: path,
    centerX: centerX,
    centerY: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart
  });
});

var NodeIdContext = /*#__PURE__*/createContext(null);
var Provider = NodeIdContext.Provider;
NodeIdContext.Consumer;

function checkElementBelowIsValid(event, connectionMode, isTarget, nodeId, handleId, isValidConnection, doc) {
  var elementBelow = doc.elementFromPoint(event.clientX, event.clientY);
  var elementBelowIsTarget = (elementBelow === null || elementBelow === void 0 ? void 0 : elementBelow.classList.contains('target')) || false;
  var elementBelowIsSource = (elementBelow === null || elementBelow === void 0 ? void 0 : elementBelow.classList.contains('source')) || false;
  var result = {
    elementBelow: elementBelow,
    isValid: false,
    connection: {
      source: null,
      target: null,
      sourceHandle: null,
      targetHandle: null
    },
    isHoveringHandle: false
  };

  if (elementBelow && (elementBelowIsTarget || elementBelowIsSource)) {
    result.isHoveringHandle = true;
    var elementBelowNodeId = elementBelow.getAttribute('data-nodeid');
    var elementBelowHandleId = elementBelow.getAttribute('data-handleid');
    var connection = isTarget ? {
      source: elementBelowNodeId,
      sourceHandle: elementBelowHandleId,
      target: nodeId,
      targetHandle: handleId
    } : {
      source: nodeId,
      sourceHandle: handleId,
      target: elementBelowNodeId,
      targetHandle: elementBelowHandleId
    };
    result.connection = connection; // in strict mode we don't allow target to target or source to source connections

    var isValid = connectionMode === ConnectionMode.Strict ? isTarget && elementBelowIsSource || !isTarget && elementBelowIsTarget : true;

    if (isValid) {
      result.isValid = isValidConnection(connection);
    }
  }

  return result;
}

function resetRecentHandle(hoveredHandle) {
  hoveredHandle === null || hoveredHandle === void 0 ? void 0 : hoveredHandle.classList.remove('react-flow__handle-valid');
  hoveredHandle === null || hoveredHandle === void 0 ? void 0 : hoveredHandle.classList.remove('react-flow__handle-connecting');
}

function handleMouseDown(_ref) {
  var event = _ref.event,
      handleId = _ref.handleId,
      nodeId = _ref.nodeId,
      onConnect = _ref.onConnect,
      isTarget = _ref.isTarget,
      getState = _ref.getState,
      setState = _ref.setState,
      isValidConnection = _ref.isValidConnection,
      elementEdgeUpdaterType = _ref.elementEdgeUpdaterType,
      onEdgeUpdateEnd = _ref.onEdgeUpdateEnd;
  var reactFlowNode = event.target.closest('.react-flow'); // when react-flow is used inside a shadow root we can't use document

  var doc = getHostForElement(event.target);

  if (!doc) {
    return;
  }

  var elementBelow = doc.elementFromPoint(event.clientX, event.clientY);
  var elementBelowIsTarget = elementBelow === null || elementBelow === void 0 ? void 0 : elementBelow.classList.contains('target');
  var elementBelowIsSource = elementBelow === null || elementBelow === void 0 ? void 0 : elementBelow.classList.contains('source');

  if (!reactFlowNode || !elementBelowIsTarget && !elementBelowIsSource && !elementEdgeUpdaterType) {
    return;
  }

  var _getState = getState(),
      onConnectStart = _getState.onConnectStart,
      connectionMode = _getState.connectionMode;

  var handleType = elementEdgeUpdaterType ? elementEdgeUpdaterType : elementBelowIsTarget ? 'target' : 'source';
  var containerBounds = reactFlowNode.getBoundingClientRect();
  var recentHoveredHandle;
  setState({
    connectionPosition: {
      x: event.clientX - containerBounds.left,
      y: event.clientY - containerBounds.top
    },
    connectionNodeId: nodeId,
    connectionHandleId: handleId,
    connectionHandleType: handleType
  });
  onConnectStart === null || onConnectStart === void 0 ? void 0 : onConnectStart(event, {
    nodeId: nodeId,
    handleId: handleId,
    handleType: handleType
  });

  function onMouseMove(event) {
    setState({
      connectionPosition: {
        x: event.clientX - containerBounds.left,
        y: event.clientY - containerBounds.top
      }
    });

    var _checkElementBelowIsV = checkElementBelowIsValid(event, connectionMode, isTarget, nodeId, handleId, isValidConnection, doc),
        connection = _checkElementBelowIsV.connection,
        elementBelow = _checkElementBelowIsV.elementBelow,
        isValid = _checkElementBelowIsV.isValid,
        isHoveringHandle = _checkElementBelowIsV.isHoveringHandle;

    if (!isHoveringHandle) {
      return resetRecentHandle(recentHoveredHandle);
    }

    if (connection.source !== connection.target && elementBelow) {
      resetRecentHandle(recentHoveredHandle);
      recentHoveredHandle = elementBelow;
      elementBelow.classList.add('react-flow__handle-connecting');
      elementBelow.classList.toggle('react-flow__handle-valid', isValid);
    }
  }

  function onMouseUp(event) {
    var _getState2 = getState(),
        onConnectStop = _getState2.onConnectStop,
        onConnectEnd = _getState2.onConnectEnd;

    var _checkElementBelowIsV2 = checkElementBelowIsValid(event, connectionMode, isTarget, nodeId, handleId, isValidConnection, doc),
        connection = _checkElementBelowIsV2.connection,
        isValid = _checkElementBelowIsV2.isValid;

    onConnectStop === null || onConnectStop === void 0 ? void 0 : onConnectStop(event);

    if (isValid) {
      onConnect === null || onConnect === void 0 ? void 0 : onConnect(connection);
    }

    onConnectEnd === null || onConnectEnd === void 0 ? void 0 : onConnectEnd(event);

    if (elementEdgeUpdaterType && onEdgeUpdateEnd) {
      onEdgeUpdateEnd(event);
    }

    resetRecentHandle(recentHoveredHandle);
    setState({
      connectionNodeId: null,
      connectionHandleId: null,
      connectionHandleType: null
    });
    doc.removeEventListener('mousemove', onMouseMove);
    doc.removeEventListener('mouseup', onMouseUp);
  }

  doc.addEventListener('mousemove', onMouseMove);
  doc.addEventListener('mouseup', onMouseUp);
}

var _excluded$1 = ["type", "position", "isValidConnection", "isConnectable", "id", "onConnect", "children", "className", "onMouseDown"];

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var alwaysValid = function alwaysValid() {
  return true;
};

var selector$a = function selector(s) {
  return {
    connectionStartHandle: s.connectionStartHandle,
    connectOnClick: s.connectOnClick
  };
};

var Handle = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'source' : _ref$type,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? Position.Top : _ref$position,
      _ref$isValidConnectio = _ref.isValidConnection,
      isValidConnection = _ref$isValidConnectio === void 0 ? alwaysValid : _ref$isValidConnectio,
      _ref$isConnectable = _ref.isConnectable,
      isConnectable = _ref$isConnectable === void 0 ? true : _ref$isConnectable,
      id = _ref.id,
      onConnect = _ref.onConnect,
      children = _ref.children,
      className = _ref.className,
      onMouseDown = _ref.onMouseDown,
      rest = _objectWithoutProperties(_ref, _excluded$1);

  var store = useStoreApi();
  var nodeId = useContext(NodeIdContext);

  var _useStore = useStore(selector$a, shallow),
      connectionStartHandle = _useStore.connectionStartHandle,
      connectOnClick = _useStore.connectOnClick;

  var handleId = id || null;
  var isTarget = type === 'target';

  var onConnectExtended = function onConnectExtended(params) {
    var _store$getState = store.getState(),
        defaultEdgeOptions = _store$getState.defaultEdgeOptions,
        onConnectAction = _store$getState.onConnect,
        hasDefaultEdges = _store$getState.hasDefaultEdges;

    var edgeParams = _objectSpread$9(_objectSpread$9({}, defaultEdgeOptions), params);

    if (hasDefaultEdges) {
      var _store$getState2 = store.getState(),
          edges = _store$getState2.edges;

      store.setState({
        edges: addEdge(edgeParams, edges)
      });
    }

    onConnectAction === null || onConnectAction === void 0 ? void 0 : onConnectAction(edgeParams);
    onConnect === null || onConnect === void 0 ? void 0 : onConnect(edgeParams);
  };

  var onMouseDownHandler = function onMouseDownHandler(event) {
    if (event.button === 0) {
      handleMouseDown({
        event: event,
        handleId: handleId,
        nodeId: nodeId,
        onConnect: onConnectExtended,
        isTarget: isTarget,
        getState: store.getState,
        setState: store.setState,
        isValidConnection: isValidConnection
      });
    }

    onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(event);
  };

  var onClick = function onClick(event) {
    var _store$getState3 = store.getState(),
        onClickConnectStart = _store$getState3.onClickConnectStart,
        onClickConnectStop = _store$getState3.onClickConnectStop,
        onClickConnectEnd = _store$getState3.onClickConnectEnd,
        connectionMode = _store$getState3.connectionMode;

    if (!connectionStartHandle) {
      onClickConnectStart === null || onClickConnectStart === void 0 ? void 0 : onClickConnectStart(event, {
        nodeId: nodeId,
        handleId: handleId,
        handleType: type
      });
      store.setState({
        connectionStartHandle: {
          nodeId: nodeId,
          type: type,
          handleId: handleId
        }
      });
      return;
    }

    var doc = getHostForElement(event.target);

    var _checkElementBelowIsV = checkElementBelowIsValid(event, connectionMode, connectionStartHandle.type === 'target', connectionStartHandle.nodeId, connectionStartHandle.handleId || null, isValidConnection, doc),
        connection = _checkElementBelowIsV.connection,
        isValid = _checkElementBelowIsV.isValid;

    onClickConnectStop === null || onClickConnectStop === void 0 ? void 0 : onClickConnectStop(event);

    if (isValid) {
      onConnectExtended(connection);
    }

    onClickConnectEnd === null || onClickConnectEnd === void 0 ? void 0 : onClickConnectEnd(event);
    store.setState({
      connectionStartHandle: null
    });
  };

  return /*#__PURE__*/React.createElement("div", _objectSpread$9({
    "data-handleid": handleId,
    "data-nodeid": nodeId,
    "data-handlepos": position,
    className: cc(['react-flow__handle', "react-flow__handle-".concat(position), 'nodrag', className, {
      source: !isTarget,
      target: isTarget,
      connectable: isConnectable,
      connecting: (connectionStartHandle === null || connectionStartHandle === void 0 ? void 0 : connectionStartHandle.nodeId) === nodeId && (connectionStartHandle === null || connectionStartHandle === void 0 ? void 0 : connectionStartHandle.handleId) === handleId && (connectionStartHandle === null || connectionStartHandle === void 0 ? void 0 : connectionStartHandle.type) === type
    }]),
    onMouseDown: onMouseDownHandler,
    onClick: connectOnClick ? onClick : undefined,
    ref: ref
  }, rest), children);
});
Handle.displayName = 'Handle';
var Handle$1 = /*#__PURE__*/memo(Handle);

var DefaultNode = function DefaultNode(_ref) {
  var data = _ref.data,
      isConnectable = _ref.isConnectable,
      _ref$targetPosition = _ref.targetPosition,
      targetPosition = _ref$targetPosition === void 0 ? Position.Top : _ref$targetPosition,
      _ref$sourcePosition = _ref.sourcePosition,
      sourcePosition = _ref$sourcePosition === void 0 ? Position.Bottom : _ref$sourcePosition;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Handle$1, {
    type: "target",
    position: targetPosition,
    isConnectable: isConnectable
  }), data === null || data === void 0 ? void 0 : data.label, /*#__PURE__*/React.createElement(Handle$1, {
    type: "source",
    position: sourcePosition,
    isConnectable: isConnectable
  }));
};

DefaultNode.displayName = 'DefaultNode';
var DefaultNode$1 = /*#__PURE__*/memo(DefaultNode);

var InputNode = function InputNode(_ref) {
  var data = _ref.data,
      isConnectable = _ref.isConnectable,
      _ref$sourcePosition = _ref.sourcePosition,
      sourcePosition = _ref$sourcePosition === void 0 ? Position.Bottom : _ref$sourcePosition;
  return /*#__PURE__*/React.createElement(React.Fragment, null, data === null || data === void 0 ? void 0 : data.label, /*#__PURE__*/React.createElement(Handle$1, {
    type: "source",
    position: sourcePosition,
    isConnectable: isConnectable
  }));
};

InputNode.displayName = 'InputNode';
var InputNode$1 = /*#__PURE__*/memo(InputNode);

var OutputNode = function OutputNode(_ref) {
  var data = _ref.data,
      isConnectable = _ref.isConnectable,
      _ref$targetPosition = _ref.targetPosition,
      targetPosition = _ref$targetPosition === void 0 ? Position.Top : _ref$targetPosition;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Handle$1, {
    type: "target",
    position: targetPosition,
    isConnectable: isConnectable
  }), data === null || data === void 0 ? void 0 : data.label);
};

OutputNode.displayName = 'OutputNode';
var OutputNode$1 = /*#__PURE__*/memo(OutputNode);

var selector$9 = function selector(s) {
  return {
    selectedNodes: Array.from(s.nodeInternals.values()).filter(function (n) {
      return n.selected;
    }),
    selectedEdges: s.edges.filter(function (e) {
      return e.selected;
    })
  };
};

var areEqual = function areEqual(objA, objB) {
  var selectedNodeIdsA = objA.selectedNodes.map(function (n) {
    return n.id;
  });
  var selectedNodeIdsB = objB.selectedNodes.map(function (n) {
    return n.id;
  });
  var selectedEdgeIdsA = objA.selectedEdges.map(function (e) {
    return e.id;
  });
  var selectedEdgeIdsB = objB.selectedEdges.map(function (e) {
    return e.id;
  });
  return shallow(selectedNodeIdsA, selectedNodeIdsB) && shallow(selectedEdgeIdsA, selectedEdgeIdsB);
}; // This is just a helper component for calling the onSelectionChange listener.
// @TODO: Now that we have the onNodesChange and on EdgesChange listeners, do we still need this component?


function SelectionListener(_ref) {
  var onSelectionChange = _ref.onSelectionChange;

  var _useStore = useStore(selector$9, areEqual),
      selectedNodes = _useStore.selectedNodes,
      selectedEdges = _useStore.selectedEdges;

  useEffect(function () {
    onSelectionChange({
      nodes: selectedNodes,
      edges: selectedEdges
    });
  }, [selectedNodes, selectedEdges]);
  return null;
}

var SelectionListener$1 = /*#__PURE__*/memo(SelectionListener);

var selector$8 = function selector(s) {
  return {
    setNodes: s.setNodes,
    setEdges: s.setEdges,
    setDefaultNodesAndEdges: s.setDefaultNodesAndEdges,
    setMinZoom: s.setMinZoom,
    setMaxZoom: s.setMaxZoom,
    setTranslateExtent: s.setTranslateExtent,
    setNodeExtent: s.setNodeExtent,
    reset: s.reset
  };
};

function useStoreUpdater(value, setStoreState) {
  useEffect(function () {
    if (typeof value !== 'undefined') {
      setStoreState(value);
    }
  }, [value]);
}

function useDirectStoreUpdater(key, value, setState) {
  useEffect(function () {
    if (typeof value !== 'undefined') {
      // @ts-ignore
      setState(_defineProperty({}, key, value));
    }
  }, [value]);
}

var StoreUpdater = function StoreUpdater(_ref) {
  var nodes = _ref.nodes,
      edges = _ref.edges,
      defaultNodes = _ref.defaultNodes,
      defaultEdges = _ref.defaultEdges,
      onConnect = _ref.onConnect,
      onConnectStart = _ref.onConnectStart,
      onConnectStop = _ref.onConnectStop,
      onConnectEnd = _ref.onConnectEnd,
      onClickConnectStart = _ref.onClickConnectStart,
      onClickConnectStop = _ref.onClickConnectStop,
      onClickConnectEnd = _ref.onClickConnectEnd,
      nodesDraggable = _ref.nodesDraggable,
      nodesConnectable = _ref.nodesConnectable,
      minZoom = _ref.minZoom,
      maxZoom = _ref.maxZoom,
      nodeExtent = _ref.nodeExtent,
      onNodesChange = _ref.onNodesChange,
      onEdgesChange = _ref.onEdgesChange,
      elementsSelectable = _ref.elementsSelectable,
      connectionMode = _ref.connectionMode,
      snapGrid = _ref.snapGrid,
      snapToGrid = _ref.snapToGrid,
      translateExtent = _ref.translateExtent,
      connectOnClick = _ref.connectOnClick,
      defaultEdgeOptions = _ref.defaultEdgeOptions,
      fitView = _ref.fitView,
      fitViewOptions = _ref.fitViewOptions,
      onNodesDelete = _ref.onNodesDelete,
      onEdgesDelete = _ref.onEdgesDelete,
      onNodeDrag = _ref.onNodeDrag,
      onNodeDragStart = _ref.onNodeDragStart,
      onNodeDragStop = _ref.onNodeDragStop,
      onSelectionDrag = _ref.onSelectionDrag,
      onSelectionDragStart = _ref.onSelectionDragStart,
      onSelectionDragStop = _ref.onSelectionDragStop;

  var _useStore = useStore(selector$8, shallow),
      setNodes = _useStore.setNodes,
      setEdges = _useStore.setEdges,
      setDefaultNodesAndEdges = _useStore.setDefaultNodesAndEdges,
      setMinZoom = _useStore.setMinZoom,
      setMaxZoom = _useStore.setMaxZoom,
      setTranslateExtent = _useStore.setTranslateExtent,
      setNodeExtent = _useStore.setNodeExtent,
      reset = _useStore.reset;

  var store = useStoreApi();
  useEffect(function () {
    setDefaultNodesAndEdges(defaultNodes, defaultEdges);
    return function () {
      reset();
    };
  }, []);
  useDirectStoreUpdater('defaultEdgeOptions', defaultEdgeOptions, store.setState);
  useDirectStoreUpdater('connectionMode', connectionMode, store.setState);
  useDirectStoreUpdater('onConnect', onConnect, store.setState);
  useDirectStoreUpdater('onConnectStart', onConnectStart, store.setState);
  useDirectStoreUpdater('onConnectStop', onConnectStop, store.setState);
  useDirectStoreUpdater('onConnectEnd', onConnectEnd, store.setState);
  useDirectStoreUpdater('onClickConnectStart', onClickConnectStart, store.setState);
  useDirectStoreUpdater('onClickConnectStop', onClickConnectStop, store.setState);
  useDirectStoreUpdater('onClickConnectEnd', onClickConnectEnd, store.setState);
  useDirectStoreUpdater('nodesDraggable', nodesDraggable, store.setState);
  useDirectStoreUpdater('nodesConnectable', nodesConnectable, store.setState);
  useDirectStoreUpdater('elementsSelectable', elementsSelectable, store.setState);
  useDirectStoreUpdater('snapToGrid', snapToGrid, store.setState);
  useDirectStoreUpdater('snapGrid', snapGrid, store.setState);
  useDirectStoreUpdater('onNodesChange', onNodesChange, store.setState);
  useDirectStoreUpdater('onEdgesChange', onEdgesChange, store.setState);
  useDirectStoreUpdater('connectOnClick', connectOnClick, store.setState);
  useDirectStoreUpdater('fitViewOnInit', fitView, store.setState);
  useDirectStoreUpdater('fitViewOnInitOptions', fitViewOptions, store.setState);
  useDirectStoreUpdater('onNodesDelete', onNodesDelete, store.setState);
  useDirectStoreUpdater('onEdgesDelete', onEdgesDelete, store.setState);
  useDirectStoreUpdater('onNodeDrag', onNodeDrag, store.setState);
  useDirectStoreUpdater('onNodeDragStart', onNodeDragStart, store.setState);
  useDirectStoreUpdater('onNodeDragStop', onNodeDragStop, store.setState);
  useDirectStoreUpdater('onSelectionDrag', onSelectionDrag, store.setState);
  useDirectStoreUpdater('onSelectionDragStart', onSelectionDragStart, store.setState);
  useDirectStoreUpdater('onSelectionDragStop', onSelectionDragStop, store.setState);
  useStoreUpdater(nodes, setNodes);
  useStoreUpdater(edges, setEdges);
  useStoreUpdater(defaultNodes, setNodes);
  useStoreUpdater(defaultEdges, setEdges);
  useStoreUpdater(minZoom, setMinZoom);
  useStoreUpdater(maxZoom, setMaxZoom);
  useStoreUpdater(translateExtent, setTranslateExtent);
  useStoreUpdater(nodeExtent, setNodeExtent);
  return null;
};

var shiftX = function shiftX(x, shift, position) {
  if (position === Position.Left) return x - shift;
  if (position === Position.Right) return x + shift;
  return x;
};

var shiftY = function shiftY(y, shift, position) {
  if (position === Position.Top) return y - shift;
  if (position === Position.Bottom) return y + shift;
  return y;
};

var EdgeAnchor = function EdgeAnchor(_ref) {
  var className = _ref.className,
      position = _ref.position,
      centerX = _ref.centerX,
      centerY = _ref.centerY,
      _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? 10 : _ref$radius;
  return /*#__PURE__*/React.createElement("circle", {
    className: cc(['react-flow__edgeupdater', className]),
    cx: shiftX(centerX, radius, position),
    cy: shiftY(centerY, radius, position),
    r: radius,
    stroke: "transparent",
    fill: "transparent"
  });
};

var wrapEdge = (function (EdgeComponent) {
  var EdgeWrapper = function EdgeWrapper(_ref) {
    var id = _ref.id,
        className = _ref.className,
        type = _ref.type,
        data = _ref.data,
        onClick = _ref.onClick,
        onEdgeDoubleClick = _ref.onEdgeDoubleClick,
        selected = _ref.selected,
        animated = _ref.animated,
        label = _ref.label,
        labelStyle = _ref.labelStyle,
        labelShowBg = _ref.labelShowBg,
        labelBgStyle = _ref.labelBgStyle,
        labelBgPadding = _ref.labelBgPadding,
        labelBgBorderRadius = _ref.labelBgBorderRadius,
        style = _ref.style,
        source = _ref.source,
        target = _ref.target,
        sourceX = _ref.sourceX,
        sourceY = _ref.sourceY,
        targetX = _ref.targetX,
        targetY = _ref.targetY,
        sourcePosition = _ref.sourcePosition,
        targetPosition = _ref.targetPosition,
        elementsSelectable = _ref.elementsSelectable,
        hidden = _ref.hidden,
        sourceHandleId = _ref.sourceHandleId,
        targetHandleId = _ref.targetHandleId,
        onContextMenu = _ref.onContextMenu,
        onMouseEnter = _ref.onMouseEnter,
        onMouseMove = _ref.onMouseMove,
        onMouseLeave = _ref.onMouseLeave,
        edgeUpdaterRadius = _ref.edgeUpdaterRadius,
        onEdgeUpdate = _ref.onEdgeUpdate,
        onEdgeUpdateStart = _ref.onEdgeUpdateStart,
        onEdgeUpdateEnd = _ref.onEdgeUpdateEnd,
        markerEnd = _ref.markerEnd,
        markerStart = _ref.markerStart,
        rfId = _ref.rfId;

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        updating = _useState2[0],
        setUpdating = _useState2[1];

    var store = useStoreApi();

    var onEdgeClick = function onEdgeClick(event) {
      var _store$getState = store.getState(),
          edges = _store$getState.edges,
          addSelectedEdges = _store$getState.addSelectedEdges;

      var edge = edges.find(function (e) {
        return e.id === id;
      });

      if (elementsSelectable) {
        store.setState({
          nodesSelectionActive: false
        });
        addSelectedEdges([id]);
      }

      onClick === null || onClick === void 0 ? void 0 : onClick(event, edge);
    };

    var onEdgeDoubleClickHandler = getMouseHandler(id, store.getState, onEdgeDoubleClick);
    var onEdgeContextMenu = getMouseHandler(id, store.getState, onContextMenu);
    var onEdgeMouseEnter = getMouseHandler(id, store.getState, onMouseEnter);
    var onEdgeMouseMove = getMouseHandler(id, store.getState, onMouseMove);
    var onEdgeMouseLeave = getMouseHandler(id, store.getState, onMouseLeave);

    var handleEdgeUpdater = function handleEdgeUpdater(event, isSourceHandle) {
      var nodeId = isSourceHandle ? target : source;
      var handleId = (isSourceHandle ? targetHandleId : sourceHandleId) || null;
      var handleType = isSourceHandle ? 'target' : 'source';

      var isValidConnection = function isValidConnection() {
        return true;
      };

      var isTarget = isSourceHandle;
      var edge = store.getState().edges.find(function (e) {
        return e.id === id;
      });
      onEdgeUpdateStart === null || onEdgeUpdateStart === void 0 ? void 0 : onEdgeUpdateStart(event, edge, handleType);

      var _onEdgeUpdateEnd = onEdgeUpdateEnd ? function (evt) {
        return onEdgeUpdateEnd(evt, edge, handleType);
      } : undefined;

      var onConnectEdge = function onConnectEdge(connection) {
        return onEdgeUpdate === null || onEdgeUpdate === void 0 ? void 0 : onEdgeUpdate(edge, connection);
      };

      handleMouseDown({
        event: event,
        handleId: handleId,
        nodeId: nodeId,
        onConnect: onConnectEdge,
        isTarget: isTarget,
        getState: store.getState,
        setState: store.setState,
        isValidConnection: isValidConnection,
        elementEdgeUpdaterType: handleType,
        onEdgeUpdateEnd: _onEdgeUpdateEnd
      });
    };

    var onEdgeUpdaterSourceMouseDown = function onEdgeUpdaterSourceMouseDown(event) {
      return handleEdgeUpdater(event, true);
    };

    var onEdgeUpdaterTargetMouseDown = function onEdgeUpdaterTargetMouseDown(event) {
      return handleEdgeUpdater(event, false);
    };

    var onEdgeUpdaterMouseEnter = function onEdgeUpdaterMouseEnter() {
      return setUpdating(true);
    };

    var onEdgeUpdaterMouseOut = function onEdgeUpdaterMouseOut() {
      return setUpdating(false);
    };

    var markerStartUrl = useMemo(function () {
      return "url(#".concat(getMarkerId(markerStart, rfId), ")");
    }, [markerStart, rfId]);
    var markerEndUrl = useMemo(function () {
      return "url(#".concat(getMarkerId(markerEnd, rfId), ")");
    }, [markerEnd, rfId]);

    if (hidden) {
      return null;
    }

    var inactive = !elementsSelectable && !onClick;
    var handleEdgeUpdate = typeof onEdgeUpdate !== 'undefined';
    var edgeClasses = cc(['react-flow__edge', "react-flow__edge-".concat(type), className, {
      selected: selected,
      animated: animated,
      inactive: inactive,
      updating: updating
    }]);
    return /*#__PURE__*/React.createElement("g", {
      className: edgeClasses,
      onClick: onEdgeClick,
      onDoubleClick: onEdgeDoubleClickHandler,
      onContextMenu: onEdgeContextMenu,
      onMouseEnter: onEdgeMouseEnter,
      onMouseMove: onEdgeMouseMove,
      onMouseLeave: onEdgeMouseLeave
    }, /*#__PURE__*/React.createElement(EdgeComponent, {
      id: id,
      source: source,
      target: target,
      selected: selected,
      animated: animated,
      label: label,
      labelStyle: labelStyle,
      labelShowBg: labelShowBg,
      labelBgStyle: labelBgStyle,
      labelBgPadding: labelBgPadding,
      labelBgBorderRadius: labelBgBorderRadius,
      data: data,
      style: style,
      sourceX: sourceX,
      sourceY: sourceY,
      targetX: targetX,
      targetY: targetY,
      sourcePosition: sourcePosition,
      targetPosition: targetPosition,
      sourceHandleId: sourceHandleId,
      targetHandleId: targetHandleId,
      markerStart: markerStartUrl,
      markerEnd: markerEndUrl,
      "data-testid": "rf__edge-".concat(id)
    }), handleEdgeUpdate && /*#__PURE__*/React.createElement("g", {
      onMouseDown: onEdgeUpdaterSourceMouseDown,
      onMouseEnter: onEdgeUpdaterMouseEnter,
      onMouseOut: onEdgeUpdaterMouseOut
    }, /*#__PURE__*/React.createElement(EdgeAnchor, {
      position: sourcePosition,
      centerX: sourceX,
      centerY: sourceY,
      radius: edgeUpdaterRadius
    })), handleEdgeUpdate && /*#__PURE__*/React.createElement("g", {
      onMouseDown: onEdgeUpdaterTargetMouseDown,
      onMouseEnter: onEdgeUpdaterMouseEnter,
      onMouseOut: onEdgeUpdaterMouseOut
    }, /*#__PURE__*/React.createElement(EdgeAnchor, {
      position: targetPosition,
      centerX: targetX,
      centerY: targetY,
      radius: edgeUpdaterRadius
    })));
  };

  EdgeWrapper.displayName = 'EdgeWrapper';
  return /*#__PURE__*/memo(EdgeWrapper);
});

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function createEdgeTypes(edgeTypes) {
  var standardTypes = {
    "default": wrapEdge(edgeTypes["default"] || BezierEdge),
    straight: wrapEdge(edgeTypes.bezier || StraightEdge),
    step: wrapEdge(edgeTypes.step || StepEdge),
    smoothstep: wrapEdge(edgeTypes.step || SmoothStepEdge),
    simplebezier: wrapEdge(edgeTypes.simplebezier || SimpleBezierEdge)
  };
  var wrappedTypes = {};
  var specialTypes = Object.keys(edgeTypes).filter(function (k) {
    return !['default', 'bezier'].includes(k);
  }).reduce(function (res, key) {
    res[key] = wrapEdge(edgeTypes[key] || BezierEdge);
    return res;
  }, wrappedTypes);
  return _objectSpread$8(_objectSpread$8({}, standardTypes), specialTypes);
}
function getHandlePosition(position, nodeRect) {
  var handle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var x = ((handle === null || handle === void 0 ? void 0 : handle.x) || 0) + nodeRect.x;
  var y = ((handle === null || handle === void 0 ? void 0 : handle.y) || 0) + nodeRect.y;
  var width = (handle === null || handle === void 0 ? void 0 : handle.width) || nodeRect.width;
  var height = (handle === null || handle === void 0 ? void 0 : handle.height) || nodeRect.height;

  switch (position) {
    case Position.Top:
      return {
        x: x + width / 2,
        y: y
      };

    case Position.Right:
      return {
        x: x + width,
        y: y + height / 2
      };

    case Position.Bottom:
      return {
        x: x + width / 2,
        y: y + height
      };

    case Position.Left:
      return {
        x: x,
        y: y + height / 2
      };
  }
}
function getHandle(bounds, handleId) {
  if (!bounds) {
    return null;
  } // there is no handleId when there are no multiple handles/ handles with ids
  // so we just pick the first one


  var handle = null;

  if (bounds.length === 1 || !handleId) {
    handle = bounds[0];
  } else if (handleId) {
    handle = bounds.find(function (d) {
      return d.id === handleId;
    });
  }

  return typeof handle === 'undefined' ? null : handle;
}
var getEdgePositions = function getEdgePositions(sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition) {
  var sourceHandlePos = getHandlePosition(sourcePosition, sourceNodeRect, sourceHandle);
  var targetHandlePos = getHandlePosition(targetPosition, targetNodeRect, targetHandle);
  return {
    sourceX: sourceHandlePos.x,
    sourceY: sourceHandlePos.y,
    targetX: targetHandlePos.x,
    targetY: targetHandlePos.y
  };
};
function isEdgeVisible(_ref) {
  var sourcePos = _ref.sourcePos,
      targetPos = _ref.targetPos,
      sourceWidth = _ref.sourceWidth,
      sourceHeight = _ref.sourceHeight,
      targetWidth = _ref.targetWidth,
      targetHeight = _ref.targetHeight,
      width = _ref.width,
      height = _ref.height,
      transform = _ref.transform;
  var edgeBox = {
    x: Math.min(sourcePos.x, targetPos.x),
    y: Math.min(sourcePos.y, targetPos.y),
    x2: Math.max(sourcePos.x + sourceWidth, targetPos.x + targetWidth),
    y2: Math.max(sourcePos.y + sourceHeight, targetPos.y + targetHeight)
  };

  if (edgeBox.x === edgeBox.x2) {
    edgeBox.x2 += 1;
  }

  if (edgeBox.y === edgeBox.y2) {
    edgeBox.y2 += 1;
  }

  var viewBox = rectToBox({
    x: (0 - transform[0]) / transform[2],
    y: (0 - transform[1]) / transform[2],
    width: width / transform[2],
    height: height / transform[2]
  });
  var xOverlap = Math.max(0, Math.min(viewBox.x2, edgeBox.x2) - Math.max(viewBox.x, edgeBox.x));
  var yOverlap = Math.max(0, Math.min(viewBox.y2, edgeBox.y2) - Math.max(viewBox.y, edgeBox.y));
  var overlappingArea = Math.ceil(xOverlap * yOverlap);
  return overlappingArea > 0;
}
function getNodeData(nodeInternals, nodeId) {
  var _node$internalsSymbol, _node$positionAbsolut, _node$positionAbsolut2, _node$positionAbsolut3, _node$positionAbsolut4;

  var node = nodeInternals.get(nodeId);
  var handleBounds = (node === null || node === void 0 ? void 0 : (_node$internalsSymbol = node[internalsSymbol]) === null || _node$internalsSymbol === void 0 ? void 0 : _node$internalsSymbol.handleBounds) || null;
  var isInvalid = !node || !handleBounds || !node.width || !node.height || typeof ((_node$positionAbsolut = node.positionAbsolute) === null || _node$positionAbsolut === void 0 ? void 0 : _node$positionAbsolut.x) === 'undefined' || typeof ((_node$positionAbsolut2 = node.positionAbsolute) === null || _node$positionAbsolut2 === void 0 ? void 0 : _node$positionAbsolut2.y) === 'undefined';
  return [{
    x: (node === null || node === void 0 ? void 0 : (_node$positionAbsolut3 = node.positionAbsolute) === null || _node$positionAbsolut3 === void 0 ? void 0 : _node$positionAbsolut3.x) || 0,
    y: (node === null || node === void 0 ? void 0 : (_node$positionAbsolut4 = node.positionAbsolute) === null || _node$positionAbsolut4 === void 0 ? void 0 : _node$positionAbsolut4.y) || 0,
    width: (node === null || node === void 0 ? void 0 : node.width) || 0,
    height: (node === null || node === void 0 ? void 0 : node.height) || 0
  }, handleBounds, !isInvalid];
}

var doc = typeof document !== 'undefined' ? document : null; // the keycode can be a string 'a' or an array of strings ['a', 'a+d']
// a string means a single key 'a' or a combination when '+' is used 'a+d'
// an array means different possibilites. Explainer: ['a', 'd+s'] here the
// user can use the single key 'a' or the combination 'd' + 's'

var useKeyPress = (function () {
  var keyCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    target: doc
  };

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      keyPressed = _useState2[0],
      setKeyPressed = _useState2[1]; // we need to remember the pressed keys in order to support combinations


  var pressedKeys = useRef(new Set([])); // keyCodes = array with single keys [['a']] or key combinations [['a', 's']]
  // keysToWatch = array with all keys flattened ['a', 'd', 'ShiftLeft']
  // used to check if we store event.code or event.key. When the code is in the list of keysToWatch
  // we use the code otherwise the key. Explainer: When you press the left "command" key, the code is "MetaLeft"
  // and the key is "Meta". We want users to be able to pass keys and codes so we assume that the key is meant when
  // we can't find it in the list of keysToWatch.

  var _useMemo = useMemo(function () {
    if (keyCode !== null) {
      var keyCodeArr = Array.isArray(keyCode) ? keyCode : [keyCode];
      var keys = keyCodeArr.filter(function (kc) {
        return typeof kc === 'string';
      }).map(function (kc) {
        return kc.split('+');
      });
      var keysFlat = keys.reduce(function (res, item) {
        return res.concat.apply(res, _toConsumableArray(item));
      }, []);
      return [keys, keysFlat];
    }

    return [[], []];
  }, [keyCode]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      keyCodes = _useMemo2[0],
      keysToWatch = _useMemo2[1];

  useEffect(function () {
    if (keyCode !== null) {
      var _options$target, _options$target2;

      var downHandler = function downHandler(event) {
        if (isInputDOMNode(event)) {
          return false;
        }

        var keyOrCode = useKeyOrCode(event.code, keysToWatch);
        pressedKeys.current.add(event[keyOrCode]);

        if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
          event.preventDefault();
          setKeyPressed(true);
        }
      };

      var upHandler = function upHandler(event) {
        if (isInputDOMNode(event)) {
          return false;
        }

        var keyOrCode = useKeyOrCode(event.code, keysToWatch);

        if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
          setKeyPressed(false);
          pressedKeys.current.clear();
        } else {
          pressedKeys.current["delete"](event[keyOrCode]);
        }
      };

      var resetHandler = function resetHandler() {
        pressedKeys.current.clear();
        setKeyPressed(false);
      };

      options === null || options === void 0 ? void 0 : (_options$target = options.target) === null || _options$target === void 0 ? void 0 : _options$target.addEventListener('keydown', downHandler);
      options === null || options === void 0 ? void 0 : (_options$target2 = options.target) === null || _options$target2 === void 0 ? void 0 : _options$target2.addEventListener('keyup', upHandler);
      window.addEventListener('blur', resetHandler);
      return function () {
        var _options$target3, _options$target4;

        options === null || options === void 0 ? void 0 : (_options$target3 = options.target) === null || _options$target3 === void 0 ? void 0 : _options$target3.removeEventListener('keydown', downHandler);
        options === null || options === void 0 ? void 0 : (_options$target4 = options.target) === null || _options$target4 === void 0 ? void 0 : _options$target4.removeEventListener('keyup', upHandler);
        window.removeEventListener('blur', resetHandler);
      };
    }
  }, [keyCode, setKeyPressed]);
  return keyPressed;
}); // utils

function isMatchingKey(keyCodes, pressedKeys, isUp) {
  return keyCodes // we only want to compare same sizes of keyCode definitions
  // and pressed keys. When the user specified 'Meta' as a key somewhere
  // this would also be truthy without this filter when user presses 'Meta' + 'r'
  .filter(function (keys) {
    return isUp || keys.length === pressedKeys.size;
  }) // since we want to support multiple possibilities only one of the
  // combinations need to be part of the pressed keys
  .some(function (keys) {
    return keys.every(function (k) {
      return pressedKeys.has(k);
    });
  });
}

function useKeyOrCode(eventCode, keysToWatch) {
  return keysToWatch.includes(eventCode) ? 'code' : 'key';
}

function isInputDOMNode(event) {
  var _event$composedPath;

  // using composed path for handling shadow dom
  var target = ((_event$composedPath = event.composedPath) === null || _event$composedPath === void 0 ? void 0 : _event$composedPath.call(event)[0]) || event.target;
  return ['INPUT', 'SELECT', 'TEXTAREA'].includes(target === null || target === void 0 ? void 0 : target.nodeName) || (target === null || target === void 0 ? void 0 : target.hasAttribute('contenteditable'));
}

var selector$7 = function selector(s) {
  return {
    onNodesChange: s.onNodesChange,
    onEdgesChange: s.onEdgesChange
  };
};

var useGlobalKeyHandler = (function (_ref) {
  var deleteKeyCode = _ref.deleteKeyCode,
      multiSelectionKeyCode = _ref.multiSelectionKeyCode;
  var store = useStoreApi();

  var _useStore = useStore(selector$7, shallow),
      onNodesChange = _useStore.onNodesChange,
      onEdgesChange = _useStore.onEdgesChange;

  var deleteKeyPressed = useKeyPress(deleteKeyCode);
  var multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);
  useEffect(function () {
    var _store$getState = store.getState(),
        nodeInternals = _store$getState.nodeInternals,
        edges = _store$getState.edges,
        hasDefaultNodes = _store$getState.hasDefaultNodes,
        hasDefaultEdges = _store$getState.hasDefaultEdges,
        onNodesDelete = _store$getState.onNodesDelete,
        onEdgesDelete = _store$getState.onEdgesDelete;

    var nodes = Array.from(nodeInternals.values());
    var nodesToRemove = nodes.reduce(function (res, node) {
      if (!node.selected && node.parentNode && res.find(function (n) {
        return n.id === node.parentNode;
      })) {
        res.push(node);
      } else if (node.selected) {
        res.push(node);
      }

      return res;
    }, []);
    var selectedEdges = edges.filter(function (e) {
      return e.selected;
    });

    if (deleteKeyPressed && (nodesToRemove || selectedEdges)) {
      var connectedEdges = getConnectedEdges(nodesToRemove, edges);
      var edgesToRemove = [].concat(_toConsumableArray(selectedEdges), _toConsumableArray(connectedEdges));
      var edgeIdsToRemove = edgesToRemove.reduce(function (res, edge) {
        if (!res.includes(edge.id)) {
          res.push(edge.id);
        }

        return res;
      }, []);

      if (hasDefaultEdges || hasDefaultNodes) {
        if (hasDefaultEdges) {
          store.setState({
            edges: edges.filter(function (e) {
              return !edgeIdsToRemove.includes(e.id);
            })
          });
        }

        if (hasDefaultNodes) {
          nodesToRemove.forEach(function (node) {
            nodeInternals["delete"](node.id);
          });
          store.setState({
            nodeInternals: new Map(nodeInternals)
          });
        }
      }

      if (edgeIdsToRemove.length > 0) {
        onEdgesDelete === null || onEdgesDelete === void 0 ? void 0 : onEdgesDelete(edgesToRemove);

        if (onEdgesChange) {
          var edgeChanges = edgeIdsToRemove.map(function (id) {
            return {
              id: id,
              type: 'remove'
            };
          });
          onEdgesChange(edgeChanges);
        }
      }

      if (nodesToRemove.length > 0) {
        onNodesDelete === null || onNodesDelete === void 0 ? void 0 : onNodesDelete(nodesToRemove);

        if (onNodesChange) {
          var nodeChanges = nodesToRemove.map(function (n) {
            return {
              id: n.id,
              type: 'remove'
            };
          });
          onNodesChange(nodeChanges);
        }
      }

      store.setState({
        nodesSelectionActive: false
      });
    }
  }, [deleteKeyPressed, onNodesChange, onEdgesChange]);
  useEffect(function () {
    store.setState({
      multiSelectionActive: multiSelectionKeyPressed
    });
  }, [multiSelectionKeyPressed]);
});

function useResizeHandler(rendererNode) {
  var store = useStoreApi();
  useEffect(function () {
    var resizeObserver;

    var updateDimensions = function updateDimensions() {
      if (!rendererNode.current) {
        return;
      }

      var size = getDimensions(rendererNode.current); // @ts-ignore

      if (process.env.NODE_ENV === 'development') {
        if (size.height === 0 || size.width === 0) {
          console.warn('[React Flow]: The React Flow parent container needs a width and a height to render the graph. Help: https://reactflow.dev/error#400');
        }
      }

      store.setState({
        width: size.width || 500,
        height: size.height || 500
      });
    };

    updateDimensions();
    window.onresize = updateDimensions;

    if (rendererNode.current) {
      resizeObserver = new ResizeObserver(function () {
        return updateDimensions();
      });
      resizeObserver.observe(rendererNode.current);
    }

    return function () {
      window.onresize = null;

      if (resizeObserver && rendererNode.current) {
        resizeObserver.unobserve(rendererNode.current);
      }
    };
  }, []);
}

var viewChanged = function viewChanged(prevViewport, eventViewport) {
  return prevViewport.x !== eventViewport.x || prevViewport.y !== eventViewport.y || prevViewport.zoom !== eventViewport.k;
};

var eventToFlowTransform = function eventToFlowTransform(eventViewport) {
  return {
    x: eventViewport.x,
    y: eventViewport.y,
    zoom: eventViewport.k
  };
};

var isWrappedWithClass = function isWrappedWithClass(event, className) {
  return event.target.closest(".".concat(className));
};

var selector$6 = function selector(s) {
  return {
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection,
    d3ZoomHandler: s.d3ZoomHandler
  };
};

var ZoomPane = function ZoomPane(_ref) {
  var onMove = _ref.onMove,
      onMoveStart = _ref.onMoveStart,
      onMoveEnd = _ref.onMoveEnd,
      _ref$zoomOnScroll = _ref.zoomOnScroll,
      zoomOnScroll = _ref$zoomOnScroll === void 0 ? true : _ref$zoomOnScroll,
      _ref$zoomOnPinch = _ref.zoomOnPinch,
      zoomOnPinch = _ref$zoomOnPinch === void 0 ? true : _ref$zoomOnPinch,
      _ref$panOnScroll = _ref.panOnScroll,
      panOnScroll = _ref$panOnScroll === void 0 ? false : _ref$panOnScroll,
      _ref$panOnScrollSpeed = _ref.panOnScrollSpeed,
      panOnScrollSpeed = _ref$panOnScrollSpeed === void 0 ? 0.5 : _ref$panOnScrollSpeed,
      _ref$panOnScrollMode = _ref.panOnScrollMode,
      panOnScrollMode = _ref$panOnScrollMode === void 0 ? PanOnScrollMode.Free : _ref$panOnScrollMode,
      _ref$zoomOnDoubleClic = _ref.zoomOnDoubleClick,
      zoomOnDoubleClick = _ref$zoomOnDoubleClic === void 0 ? true : _ref$zoomOnDoubleClic,
      selectionKeyPressed = _ref.selectionKeyPressed,
      elementsSelectable = _ref.elementsSelectable,
      _ref$panOnDrag = _ref.panOnDrag,
      panOnDrag = _ref$panOnDrag === void 0 ? true : _ref$panOnDrag,
      translateExtent = _ref.translateExtent,
      minZoom = _ref.minZoom,
      maxZoom = _ref.maxZoom,
      _ref$defaultZoom = _ref.defaultZoom,
      defaultZoom = _ref$defaultZoom === void 0 ? 1 : _ref$defaultZoom,
      _ref$defaultPosition = _ref.defaultPosition,
      defaultPosition = _ref$defaultPosition === void 0 ? [0, 0] : _ref$defaultPosition,
      zoomActivationKeyCode = _ref.zoomActivationKeyCode,
      _ref$preventScrolling = _ref.preventScrolling,
      preventScrolling = _ref$preventScrolling === void 0 ? true : _ref$preventScrolling,
      children = _ref.children,
      noWheelClassName = _ref.noWheelClassName,
      noPanClassName = _ref.noPanClassName;
  var store = useStoreApi();
  var isZoomingOrPanning = useRef(false);
  var zoomPane = useRef(null);
  var prevTransform = useRef({
    x: 0,
    y: 0,
    zoom: 0
  });

  var _useStore = useStore(selector$6, shallow),
      d3Zoom = _useStore.d3Zoom,
      d3Selection = _useStore.d3Selection,
      d3ZoomHandler = _useStore.d3ZoomHandler;

  var zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
  useResizeHandler(zoomPane);
  useEffect(function () {
    if (zoomPane.current) {
      var _selection$node;

      var d3ZoomInstance = zoom().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent);
      var selection = select(zoomPane.current).call(d3ZoomInstance);
      var clampedX = clamp(defaultPosition[0], translateExtent[0][0], translateExtent[1][0]);
      var clampedY = clamp(defaultPosition[1], translateExtent[0][1], translateExtent[1][1]);
      var clampedZoom = clamp(defaultZoom, minZoom, maxZoom);
      var updatedTransform = zoomIdentity.translate(clampedX, clampedY).scale(clampedZoom);
      d3ZoomInstance.transform(selection, updatedTransform);
      store.setState({
        d3Zoom: d3ZoomInstance,
        d3Selection: selection,
        d3ZoomHandler: selection.on('wheel.zoom'),
        // we need to pass transform because zoom handler is not registered when we set the initial transform
        transform: [clampedX, clampedY, clampedZoom],
        domNode: (_selection$node = selection.node()) === null || _selection$node === void 0 ? void 0 : _selection$node.closest('.react-flow')
      });
    }
  }, []);
  useEffect(function () {
    if (d3Selection && d3Zoom) {
      if (panOnScroll && !zoomActivationKeyPressed) {
        d3Selection.on('wheel', function (event) {
          if (isWrappedWithClass(event, noWheelClassName)) {
            return false;
          }

          event.preventDefault();
          event.stopImmediatePropagation();
          var currentZoom = d3Selection.property('__zoom').k || 1;

          if (event.ctrlKey && zoomOnPinch) {
            var point = pointer(event); // taken from https://github.com/d3/d3-zoom/blob/master/src/zoom.js

            var pinchDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10;

            var _zoom = currentZoom * Math.pow(2, pinchDelta);

            d3Zoom.scaleTo(d3Selection, _zoom, point);
            return;
          } // increase scroll speed in firefox
          // firefox: deltaMode === 1; chrome: deltaMode === 0


          var deltaNormalize = event.deltaMode === 1 ? 20 : 1;
          var deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
          var deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
          d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed);
        }).on('wheel.zoom', null);
      } else if (typeof d3ZoomHandler !== 'undefined') {
        d3Selection.on('wheel', function (event) {
          if (!preventScrolling || isWrappedWithClass(event, noWheelClassName)) {
            return null;
          }

          event.preventDefault();
        }).on('wheel.zoom', d3ZoomHandler);
      }
    }
  }, [panOnScroll, panOnScrollMode, d3Selection, d3Zoom, d3ZoomHandler, zoomActivationKeyPressed, zoomOnPinch, preventScrolling, noWheelClassName]);
  useEffect(function () {
    if (d3Zoom) {
      if (selectionKeyPressed && !isZoomingOrPanning.current) {
        d3Zoom.on('zoom', null);
      } else if (!selectionKeyPressed) {
        d3Zoom.on('zoom', function (event) {
          store.setState({
            transform: [event.transform.x, event.transform.y, event.transform.k]
          });

          if (onMove) {
            var flowTransform = eventToFlowTransform(event.transform);
            onMove(event.sourceEvent, flowTransform);
          }
        });
      }
    }
  }, [selectionKeyPressed, d3Zoom, onMove]);
  useEffect(function () {
    if (d3Zoom) {
      d3Zoom.on('start', function (event) {
        isZoomingOrPanning.current = true;

        if (onMoveStart) {
          var flowTransform = eventToFlowTransform(event.transform);
          prevTransform.current = flowTransform;
          onMoveStart(event.sourceEvent, flowTransform);
        }
      });
    }
  }, [d3Zoom, onMoveStart]);
  useEffect(function () {
    if (d3Zoom) {
      d3Zoom.on('end', function (event) {
        isZoomingOrPanning.current = false;

        if (onMoveEnd && viewChanged(prevTransform.current, event.transform)) {
          var flowTransform = eventToFlowTransform(event.transform);
          prevTransform.current = flowTransform;
          onMoveEnd(event.sourceEvent, flowTransform);
        }
      });
    }
  }, [d3Zoom, onMoveEnd]);
  useEffect(function () {
    if (d3Zoom) {
      d3Zoom.filter(function (event) {
        var zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
        var pinchZoom = zoomOnPinch && event.ctrlKey; // if all interactions are disabled, we prevent all zoom events

        if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) {
          return false;
        } // during a selection we prevent all other interactions


        if (selectionKeyPressed) {
          return false;
        } // if zoom on double click is disabled, we prevent the double click event


        if (!zoomOnDoubleClick && event.type === 'dblclick') {
          return false;
        } // if the target element is inside an element with the nowheel class, we prevent zooming


        if (isWrappedWithClass(event, noWheelClassName) && event.type === 'wheel') {
          return false;
        } // if the target element is inside an element with the nopan class, we prevent panning


        if (isWrappedWithClass(event, noPanClassName) && event.type !== 'wheel') {
          return false;
        }

        if (!zoomOnPinch && event.ctrlKey && event.type === 'wheel') {
          return false;
        } // when there is no scroll handling enabled, we prevent all wheel events


        if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === 'wheel') {
          return false;
        } // if the pane is not movable, we prevent dragging it with mousestart or touchstart


        if (!panOnDrag && (event.type === 'mousedown' || event.type === 'touchstart')) {
          return false;
        } // default filter for d3-zoom


        return (!event.ctrlKey || event.type === 'wheel') && !event.button;
      });
    }
  }, [d3Zoom, zoomOnScroll, zoomOnPinch, panOnScroll, zoomOnDoubleClick, panOnDrag, selectionKeyPressed, elementsSelectable, zoomActivationKeyPressed]);
  return /*#__PURE__*/React.createElement("div", {
    className: "react-flow__renderer react-flow__container",
    ref: zoomPane
  }, children);
};

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getMousePosition(event, containerBounds) {
  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top
  };
}

var selector$5 = function selector(s) {
  return {
    userSelectionActive: s.userSelectionActive,
    elementsSelectable: s.elementsSelectable
  };
};

var initialRect = {
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  draw: false
};
var UserSelection = /*#__PURE__*/memo(function (_ref) {
  var selectionKeyPressed = _ref.selectionKeyPressed;
  var store = useStoreApi();
  var prevSelectedNodesCount = useRef(0);
  var prevSelectedEdgesCount = useRef(0);
  var containerBounds = useRef();

  var _useState = useState(initialRect),
      _useState2 = _slicedToArray(_useState, 2),
      userSelectionRect = _useState2[0],
      setUserSelectionRect = _useState2[1];

  var _useStore = useStore(selector$5, shallow),
      userSelectionActive = _useStore.userSelectionActive,
      elementsSelectable = _useStore.elementsSelectable;

  var renderUserSelectionPane = userSelectionActive || selectionKeyPressed;

  if (!elementsSelectable || !renderUserSelectionPane) {
    return null;
  }

  var resetUserSelection = function resetUserSelection() {
    setUserSelectionRect(initialRect);
    store.setState({
      userSelectionActive: false
    });
    prevSelectedNodesCount.current = 0;
    prevSelectedEdgesCount.current = 0;
  };

  var onMouseDown = function onMouseDown(event) {
    var reactFlowNode = event.target.closest('.react-flow');
    containerBounds.current = reactFlowNode.getBoundingClientRect();
    var mousePos = getMousePosition(event, containerBounds.current);
    setUserSelectionRect({
      width: 0,
      height: 0,
      startX: mousePos.x,
      startY: mousePos.y,
      x: mousePos.x,
      y: mousePos.y,
      draw: true
    });
    store.setState({
      userSelectionActive: true,
      nodesSelectionActive: false
    });
  };

  var onMouseMove = function onMouseMove(event) {
    var _userSelectionRect$st, _userSelectionRect$st2;

    if (!selectionKeyPressed || !userSelectionRect.draw || !containerBounds.current) {
      return;
    }

    var mousePos = getMousePosition(event, containerBounds.current);
    var startX = (_userSelectionRect$st = userSelectionRect.startX) !== null && _userSelectionRect$st !== void 0 ? _userSelectionRect$st : 0;
    var startY = (_userSelectionRect$st2 = userSelectionRect.startY) !== null && _userSelectionRect$st2 !== void 0 ? _userSelectionRect$st2 : 0;

    var nextUserSelectRect = _objectSpread$7(_objectSpread$7({}, userSelectionRect), {}, {
      x: mousePos.x < startX ? mousePos.x : startX,
      y: mousePos.y < startY ? mousePos.y : startY,
      width: Math.abs(mousePos.x - startX),
      height: Math.abs(mousePos.y - startY)
    });

    var _store$getState = store.getState(),
        nodeInternals = _store$getState.nodeInternals,
        edges = _store$getState.edges,
        transform = _store$getState.transform,
        onNodesChange = _store$getState.onNodesChange,
        onEdgesChange = _store$getState.onEdgesChange;

    var nodes = Array.from(nodeInternals.values());
    var selectedNodes = getNodesInside(nodeInternals, nextUserSelectRect, transform, false, true);
    var selectedEdgeIds = getConnectedEdges(selectedNodes, edges).map(function (e) {
      return e.id;
    });
    var selectedNodeIds = selectedNodes.map(function (n) {
      return n.id;
    });

    if (prevSelectedNodesCount.current !== selectedNodeIds.length) {
      prevSelectedNodesCount.current = selectedNodeIds.length;
      var changes = getSelectionChanges(nodes, selectedNodeIds);

      if (changes.length) {
        onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changes);
      }
    }

    if (prevSelectedEdgesCount.current !== selectedEdgeIds.length) {
      prevSelectedEdgesCount.current = selectedEdgeIds.length;

      var _changes = getSelectionChanges(edges, selectedEdgeIds);

      if (_changes.length) {
        onEdgesChange === null || onEdgesChange === void 0 ? void 0 : onEdgesChange(_changes);
      }
    }

    setUserSelectionRect(nextUserSelectRect);
  };

  var onMouseUp = function onMouseUp() {
    store.setState({
      nodesSelectionActive: prevSelectedNodesCount.current > 0
    });
    resetUserSelection();
  };

  var onMouseLeave = function onMouseLeave() {
    store.setState({
      nodesSelectionActive: false
    });
    resetUserSelection();
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "react-flow__selectionpane react-flow__container",
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp,
    onMouseLeave: onMouseLeave
  }, userSelectionRect.draw && /*#__PURE__*/React.createElement("div", {
    className: "react-flow__selection react-flow__container",
    style: {
      width: userSelectionRect.width,
      height: userSelectionRect.height,
      transform: "translate(".concat(userSelectionRect.x, "px, ").concat(userSelectionRect.y, "px)")
    }
  }));
});

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function isParentSelected(node, nodeInternals) {
  if (!node.parentNode) {
    return false;
  }

  var parentNode = nodeInternals.get(node.parentNode);

  if (!parentNode) {
    return false;
  }

  if (parentNode.selected) {
    return true;
  }

  return isParentSelected(parentNode, nodeInternals);
}
function hasSelector(target, selector, nodeRef) {
  var current = target;

  do {
    var _current;

    if ((_current = current) !== null && _current !== void 0 && _current.matches(selector)) return true;
    if (current === nodeRef.current) return false;
    current = current.parentElement;
  } while (current);

  return false;
} // looks for all selected nodes and created a NodeDragItem for each of them

function getDragItems(nodeInternals, mousePos, nodeId) {
  return Array.from(nodeInternals.values()).filter(function (n) {
    return (n.selected || n.id === nodeId) && (!n.parentNode || !isParentSelected(n, nodeInternals));
  }).map(function (n) {
    var _n$positionAbsolute$x, _n$positionAbsolute, _n$positionAbsolute$y, _n$positionAbsolute2;

    return {
      id: n.id,
      position: n.position || {
        x: 0,
        y: 0
      },
      positionAbsolute: n.positionAbsolute || {
        x: 0,
        y: 0
      },
      distance: {
        x: mousePos.x - ((_n$positionAbsolute$x = (_n$positionAbsolute = n.positionAbsolute) === null || _n$positionAbsolute === void 0 ? void 0 : _n$positionAbsolute.x) !== null && _n$positionAbsolute$x !== void 0 ? _n$positionAbsolute$x : 0),
        y: mousePos.y - ((_n$positionAbsolute$y = (_n$positionAbsolute2 = n.positionAbsolute) === null || _n$positionAbsolute2 === void 0 ? void 0 : _n$positionAbsolute2.y) !== null && _n$positionAbsolute$y !== void 0 ? _n$positionAbsolute$y : 0)
      },
      delta: {
        x: 0,
        y: 0
      },
      extent: n.extent,
      parentNode: n.parentNode,
      width: n.width,
      height: n.height
    };
  });
}
function updatePosition(dragItem, mousePos, snapToGrid, _ref, nodeInternals, nodeExtent) {
  var _ref2 = _slicedToArray(_ref, 2),
      snapX = _ref2[0],
      snapY = _ref2[1];

  var currentExtent = dragItem.extent || nodeExtent;
  var nextPosition = {
    x: mousePos.x - dragItem.distance.x,
    y: mousePos.y - dragItem.distance.y
  };

  if (snapToGrid) {
    nextPosition.x = snapX * Math.round(nextPosition.x / snapX);
    nextPosition.y = snapY * Math.round(nextPosition.y / snapY);
  }

  if (dragItem.extent === 'parent') {
    if (dragItem.parentNode && dragItem.width && dragItem.height) {
      var parent = nodeInternals.get(dragItem.parentNode);
      currentExtent = parent !== null && parent !== void 0 && parent.positionAbsolute && parent !== null && parent !== void 0 && parent.width && parent !== null && parent !== void 0 && parent.height ? [[parent.positionAbsolute.x, parent.positionAbsolute.y], [parent.positionAbsolute.x + parent.width - dragItem.width, parent.positionAbsolute.y + parent.height - dragItem.height]] : currentExtent;
    } else {
      // @ts-ignore
      if (process.env.NODE_ENV === 'development') {
        console.warn('[React Flow]: Only child nodes can use a parent extent. Help: https://reactflow.dev/error#500');
      }

      currentExtent = nodeExtent;
    }
  } else if (dragItem.extent && dragItem.parentNode) {
    var _parent$positionAbsol, _parent$positionAbsol2, _parent$positionAbsol3, _parent$positionAbsol4;

    var _parent = nodeInternals.get(dragItem.parentNode);

    var parentX = (_parent$positionAbsol = _parent === null || _parent === void 0 ? void 0 : (_parent$positionAbsol2 = _parent.positionAbsolute) === null || _parent$positionAbsol2 === void 0 ? void 0 : _parent$positionAbsol2.x) !== null && _parent$positionAbsol !== void 0 ? _parent$positionAbsol : 0;
    var parentY = (_parent$positionAbsol3 = _parent === null || _parent === void 0 ? void 0 : (_parent$positionAbsol4 = _parent.positionAbsolute) === null || _parent$positionAbsol4 === void 0 ? void 0 : _parent$positionAbsol4.y) !== null && _parent$positionAbsol3 !== void 0 ? _parent$positionAbsol3 : 0;
    currentExtent = [[dragItem.extent[0][0] + parentX, dragItem.extent[0][1] + parentY], [dragItem.extent[1][0] + parentX, dragItem.extent[1][1] + parentY]];
  }

  var parentPosition = {
    x: 0,
    y: 0
  };

  if (dragItem.parentNode) {
    var _parentNode$positionA, _parentNode$positionA2, _parentNode$positionA3, _parentNode$positionA4;

    var parentNode = nodeInternals.get(dragItem.parentNode);
    parentPosition = {
      x: (_parentNode$positionA = parentNode === null || parentNode === void 0 ? void 0 : (_parentNode$positionA2 = parentNode.positionAbsolute) === null || _parentNode$positionA2 === void 0 ? void 0 : _parentNode$positionA2.x) !== null && _parentNode$positionA !== void 0 ? _parentNode$positionA : 0,
      y: (_parentNode$positionA3 = parentNode === null || parentNode === void 0 ? void 0 : (_parentNode$positionA4 = parentNode.positionAbsolute) === null || _parentNode$positionA4 === void 0 ? void 0 : _parentNode$positionA4.y) !== null && _parentNode$positionA3 !== void 0 ? _parentNode$positionA3 : 0
    };
  }

  dragItem.positionAbsolute = currentExtent ? clampPosition(nextPosition, currentExtent) : nextPosition;
  dragItem.position = {
    x: dragItem.positionAbsolute.x - parentPosition.x,
    y: dragItem.positionAbsolute.y - parentPosition.y
  };
  return dragItem;
} // returns two params:
// 1. the dragged node (or the first of the list, if we are dragging a node selection)
// 2. array of selected nodes (for multi selections)

function getEventHandlerParams(_ref3) {
  var nodeId = _ref3.nodeId,
      dragItems = _ref3.dragItems,
      nodeInternals = _ref3.nodeInternals;
  var extentedDragItems = dragItems.map(function (n) {
    var node = nodeInternals.get(n.id);
    return _objectSpread$6(_objectSpread$6({}, node), {}, {
      position: n.position,
      positionAbsolute: n.positionAbsolute
    });
  });
  return [nodeId ? extentedDragItems.find(function (n) {
    return n.id === nodeId;
  }) : extentedDragItems[0], extentedDragItems];
}

function wrapSelectionDragFunc(selectionFunc) {
  return function (event, _, nodes) {
    return selectionFunc === null || selectionFunc === void 0 ? void 0 : selectionFunc(event, nodes);
  };
}

function useDrag(_ref) {
  var nodeRef = _ref.nodeRef,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      noDragClassName = _ref.noDragClassName,
      handleSelector = _ref.handleSelector,
      nodeId = _ref.nodeId,
      isSelectable = _ref.isSelectable,
      selectNodesOnDrag = _ref.selectNodesOnDrag;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      dragging = _useState2[0],
      setDragging = _useState2[1];

  var store = useStoreApi();
  var dragItems = useRef();
  var lastPos = useRef({
    x: null,
    y: null
  }); // returns the pointer position projected to the RF coordinate system

  var getPointerPosition = useCallback(function (_ref2) {
    var sourceEvent = _ref2.sourceEvent;

    var _store$getState = store.getState(),
        transform = _store$getState.transform,
        snapGrid = _store$getState.snapGrid,
        snapToGrid = _store$getState.snapToGrid;

    var x = sourceEvent.touches ? sourceEvent.touches[0].clientX : sourceEvent.clientX;
    var y = sourceEvent.touches ? sourceEvent.touches[0].clientY : sourceEvent.clientY;
    var pointerPos = pointToRendererPoint({
      x: x,
      y: y
    }, transform, snapToGrid, snapGrid);
    return pointerPos;
  }, []);
  useEffect(function () {
    if (nodeRef !== null && nodeRef !== void 0 && nodeRef.current) {
      var selection = select(nodeRef.current);

      if (disabled) {
        selection.on('.drag', null);
      } else {
        var dragHandler = drag().on('start', function (event) {
          var _store$getState2 = store.getState(),
              nodeInternals = _store$getState2.nodeInternals,
              multiSelectionActive = _store$getState2.multiSelectionActive,
              unselectNodesAndEdges = _store$getState2.unselectNodesAndEdges,
              onNodeDragStart = _store$getState2.onNodeDragStart,
              onSelectionDragStart = _store$getState2.onSelectionDragStart;

          var onStart = nodeId ? onNodeDragStart : wrapSelectionDragFunc(onSelectionDragStart);

          if (!selectNodesOnDrag && !multiSelectionActive && nodeId) {
            var _nodeInternals$get;

            if (!((_nodeInternals$get = nodeInternals.get(nodeId)) !== null && _nodeInternals$get !== void 0 && _nodeInternals$get.selected)) {
              // we need to reset selected nodes when selectNodesOnDrag=false
              unselectNodesAndEdges();
            }
          }

          if (nodeId && isSelectable && selectNodesOnDrag) {
            handleNodeClick({
              id: nodeId,
              store: store
            });
          }

          var pointerPos = getPointerPosition(event);
          lastPos.current = pointerPos;
          dragItems.current = getDragItems(nodeInternals, pointerPos, nodeId);

          if (onStart && dragItems.current) {
            var _getEventHandlerParam = getEventHandlerParams({
              nodeId: nodeId,
              dragItems: dragItems.current,
              nodeInternals: nodeInternals
            }),
                _getEventHandlerParam2 = _slicedToArray(_getEventHandlerParam, 2),
                currentNode = _getEventHandlerParam2[0],
                nodes = _getEventHandlerParam2[1];

            onStart(event.sourceEvent, currentNode, nodes);
          }
        }).on('drag', function (event) {
          var _store$getState3 = store.getState(),
              updateNodePositions = _store$getState3.updateNodePositions,
              snapToGrid = _store$getState3.snapToGrid,
              snapGrid = _store$getState3.snapGrid,
              nodeInternals = _store$getState3.nodeInternals,
              nodeExtent = _store$getState3.nodeExtent,
              onNodeDrag = _store$getState3.onNodeDrag,
              onSelectionDrag = _store$getState3.onSelectionDrag;

          var pointerPos = getPointerPosition(event); // skip events without movement

          if ((lastPos.current.x !== pointerPos.x || lastPos.current.y !== pointerPos.y) && dragItems.current) {
            lastPos.current = pointerPos;
            dragItems.current = dragItems.current.map(function (n) {
              return updatePosition(n, pointerPos, snapToGrid, snapGrid, nodeInternals, nodeExtent);
            });
            var onDrag = nodeId ? onNodeDrag : wrapSelectionDragFunc(onSelectionDrag);
            updateNodePositions(dragItems.current, true, true);
            setDragging(true);

            if (onDrag) {
              var _getEventHandlerParam3 = getEventHandlerParams({
                nodeId: nodeId,
                dragItems: dragItems.current,
                nodeInternals: nodeInternals
              }),
                  _getEventHandlerParam4 = _slicedToArray(_getEventHandlerParam3, 2),
                  currentNode = _getEventHandlerParam4[0],
                  nodes = _getEventHandlerParam4[1];

              onDrag(event.sourceEvent, currentNode, nodes);
            }
          }

          event.on('end', function (event) {
            setDragging(false);

            if (dragItems.current) {
              var _store$getState4 = store.getState(),
                  _updateNodePositions = _store$getState4.updateNodePositions,
                  _nodeInternals = _store$getState4.nodeInternals,
                  onNodeDragStop = _store$getState4.onNodeDragStop,
                  onSelectionDragStop = _store$getState4.onSelectionDragStop;

              var onStop = nodeId ? onNodeDragStop : wrapSelectionDragFunc(onSelectionDragStop);

              _updateNodePositions(dragItems.current, false, false);

              if (onStop) {
                var _getEventHandlerParam5 = getEventHandlerParams({
                  nodeId: nodeId,
                  dragItems: dragItems.current,
                  nodeInternals: _nodeInternals
                }),
                    _getEventHandlerParam6 = _slicedToArray(_getEventHandlerParam5, 2),
                    _currentNode = _getEventHandlerParam6[0],
                    _nodes = _getEventHandlerParam6[1];

                onStop(event.sourceEvent, _currentNode, _nodes);
              }
            }
          });
        }).filter(function (event) {
          var target = event.target;
          var isDraggable = !event.button && (!noDragClassName || !hasSelector(target, ".".concat(noDragClassName), nodeRef)) && (!handleSelector || hasSelector(target, handleSelector, nodeRef));
          return isDraggable;
        });
        selection.call(dragHandler);
        return function () {
          selection.on('.drag', null);
        };
      }
    }
  }, [nodeRef, disabled, noDragClassName, handleSelector, isSelectable, store, nodeId, selectNodesOnDrag, getPointerPosition]);
  return dragging;
}

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var selector$4 = function selector(s) {
  return _objectSpread$5({
    transformString: "translate(".concat(s.transform[0], "px,").concat(s.transform[1], "px) scale(").concat(s.transform[2], ")"),
    userSelectionActive: s.userSelectionActive
  }, getRectOfNodes(Array.from(s.nodeInternals.values()).filter(function (n) {
    return n.selected;
  })));
};

var bboxSelector = function bboxSelector(s) {
  var selectedNodes = Array.from(s.nodeInternals.values()).filter(function (n) {
    return n.selected;
  });
  return getRectOfNodes(selectedNodes);
};

function NodesSelection(_ref) {
  var onSelectionContextMenu = _ref.onSelectionContextMenu,
      noPanClassName = _ref.noPanClassName;
  var store = useStoreApi();

  var _useStore = useStore(selector$4, shallow),
      transformString = _useStore.transformString,
      userSelectionActive = _useStore.userSelectionActive;

  var _useStore2 = useStore(bboxSelector, shallow),
      width = _useStore2.width,
      height = _useStore2.height,
      left = _useStore2.x,
      top = _useStore2.y;

  var nodeRef = useRef(null);
  useDrag({
    nodeRef: nodeRef
  });

  if (userSelectionActive || !width || !height) {
    return null;
  }

  var onContextMenu = onSelectionContextMenu ? function (event) {
    var selectedNodes = Array.from(store.getState().nodeInternals.values()).filter(function (n) {
      return n.selected;
    });
    onSelectionContextMenu(event, selectedNodes);
  } : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: cc(['react-flow__nodesselection', 'react-flow__container', noPanClassName]),
    style: {
      transform: transformString
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: nodeRef,
    className: "react-flow__nodesselection-rect",
    onContextMenu: onContextMenu,
    style: {
      width: width,
      height: height,
      top: top,
      left: left
    }
  }));
}

var NodesSelection$1 = /*#__PURE__*/memo(NodesSelection);

var selector$3 = function selector(s) {
  return s.nodesSelectionActive;
};

var FlowRenderer = function FlowRenderer(_ref) {
  var children = _ref.children,
      onPaneClick = _ref.onPaneClick,
      onPaneContextMenu = _ref.onPaneContextMenu,
      onPaneScroll = _ref.onPaneScroll,
      deleteKeyCode = _ref.deleteKeyCode,
      onMove = _ref.onMove,
      onMoveStart = _ref.onMoveStart,
      onMoveEnd = _ref.onMoveEnd,
      selectionKeyCode = _ref.selectionKeyCode,
      multiSelectionKeyCode = _ref.multiSelectionKeyCode,
      zoomActivationKeyCode = _ref.zoomActivationKeyCode,
      elementsSelectable = _ref.elementsSelectable,
      zoomOnScroll = _ref.zoomOnScroll,
      zoomOnPinch = _ref.zoomOnPinch,
      panOnScroll = _ref.panOnScroll,
      panOnScrollSpeed = _ref.panOnScrollSpeed,
      panOnScrollMode = _ref.panOnScrollMode,
      zoomOnDoubleClick = _ref.zoomOnDoubleClick,
      panOnDrag = _ref.panOnDrag,
      translateExtent = _ref.translateExtent,
      minZoom = _ref.minZoom,
      maxZoom = _ref.maxZoom,
      defaultZoom = _ref.defaultZoom,
      defaultPosition = _ref.defaultPosition,
      preventScrolling = _ref.preventScrolling,
      onSelectionContextMenu = _ref.onSelectionContextMenu,
      noWheelClassName = _ref.noWheelClassName,
      noPanClassName = _ref.noPanClassName;
  var store = useStoreApi();
  var nodesSelectionActive = useStore(selector$3);
  var selectionKeyPressed = useKeyPress(selectionKeyCode);
  useGlobalKeyHandler({
    deleteKeyCode: deleteKeyCode,
    multiSelectionKeyCode: multiSelectionKeyCode
  });

  var onClick = function onClick(event) {
    onPaneClick === null || onPaneClick === void 0 ? void 0 : onPaneClick(event);
    store.getState().resetSelectedElements();
    store.setState({
      nodesSelectionActive: false
    });
  };

  var onContextMenu = onPaneContextMenu ? function (event) {
    return onPaneContextMenu(event);
  } : undefined;
  var onWheel = onPaneScroll ? function (event) {
    return onPaneScroll(event);
  } : undefined;
  return /*#__PURE__*/React.createElement(ZoomPane, {
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    selectionKeyPressed: selectionKeyPressed,
    elementsSelectable: elementsSelectable,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnDrag: panOnDrag,
    translateExtent: translateExtent,
    minZoom: minZoom,
    maxZoom: maxZoom,
    defaultZoom: defaultZoom,
    defaultPosition: defaultPosition,
    zoomActivationKeyCode: zoomActivationKeyCode,
    preventScrolling: preventScrolling,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName
  }, children, /*#__PURE__*/React.createElement(UserSelection, {
    selectionKeyPressed: selectionKeyPressed
  }), nodesSelectionActive && /*#__PURE__*/React.createElement(NodesSelection$1, {
    onSelectionContextMenu: onSelectionContextMenu,
    noPanClassName: noPanClassName
  }), /*#__PURE__*/React.createElement("div", {
    className: "react-flow__pane react-flow__container",
    onClick: onClick,
    onContextMenu: onContextMenu,
    onWheel: onWheel
  }));
};

FlowRenderer.displayName = 'FlowRenderer';
var FlowRenderer$1 = /*#__PURE__*/memo(FlowRenderer);

function useVisibleNodes(onlyRenderVisible) {
  var nodes = useStore(useCallback(function (s) {
    return onlyRenderVisible ? getNodesInside(s.nodeInternals, {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }, s.transform, true) : Array.from(s.nodeInternals.values());
  }, [onlyRenderVisible]));
  return nodes;
}

var selector$2 = function selector(s) {
  return {
    nodesDraggable: s.nodesDraggable,
    nodesConnectable: s.nodesConnectable,
    elementsSelectable: s.elementsSelectable,
    updateNodeDimensions: s.updateNodeDimensions
  };
};

var NodeRenderer = function NodeRenderer(props) {
  var _useStore = useStore(selector$2, shallow),
      nodesDraggable = _useStore.nodesDraggable,
      nodesConnectable = _useStore.nodesConnectable,
      elementsSelectable = _useStore.elementsSelectable,
      updateNodeDimensions = _useStore.updateNodeDimensions;

  var nodes = useVisibleNodes(props.onlyRenderVisibleElements);
  var resizeObserverRef = useRef();
  var resizeObserver = useMemo(function () {
    if (typeof ResizeObserver === 'undefined') {
      return null;
    }

    var observer = new ResizeObserver(function (entries) {
      var updates = entries.map(function (entry) {
        return {
          id: entry.target.getAttribute('data-id'),
          nodeElement: entry.target,
          forceUpdate: true
        };
      });
      updateNodeDimensions(updates);
    });
    resizeObserverRef.current = observer;
    return observer;
  }, []);
  useEffect(function () {
    return function () {
      var _resizeObserverRef$cu;

      resizeObserverRef === null || resizeObserverRef === void 0 ? void 0 : (_resizeObserverRef$cu = resizeObserverRef.current) === null || _resizeObserverRef$cu === void 0 ? void 0 : _resizeObserverRef$cu.disconnect();
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "react-flow__nodes react-flow__container"
  }, nodes.map(function (node) {
    var _node$positionAbsolut, _node$positionAbsolut2, _node$positionAbsolut3, _node$positionAbsolut4, _node$internalsSymbol, _node$internalsSymbol2, _node$internalsSymbol3;

    var nodeType = node.type || 'default';

    if (!props.nodeTypes[nodeType]) {
      // @ts-ignore
      if (process.env.NODE_ENV === 'development') {
        console.warn("[React Flow]: Node type \"".concat(nodeType, "\" not found. Using fallback type \"default\". Help: https://reactflow.dev/error#300"));
      }

      nodeType = 'default';
    }

    var NodeComponent = props.nodeTypes[nodeType] || props.nodeTypes["default"];
    var isDraggable = !!(node.draggable || nodesDraggable && typeof node.draggable === 'undefined');
    var isSelectable = !!(node.selectable || elementsSelectable && typeof node.selectable === 'undefined');
    var isConnectable = !!(node.connectable || nodesConnectable && typeof node.connectable === 'undefined');
    return /*#__PURE__*/React.createElement(NodeComponent, {
      key: node.id,
      id: node.id,
      className: node.className,
      style: node.style,
      type: nodeType,
      data: node.data,
      sourcePosition: node.sourcePosition || Position.Bottom,
      targetPosition: node.targetPosition || Position.Top,
      hidden: node.hidden,
      xPos: (_node$positionAbsolut = (_node$positionAbsolut2 = node.positionAbsolute) === null || _node$positionAbsolut2 === void 0 ? void 0 : _node$positionAbsolut2.x) !== null && _node$positionAbsolut !== void 0 ? _node$positionAbsolut : 0,
      yPos: (_node$positionAbsolut3 = (_node$positionAbsolut4 = node.positionAbsolute) === null || _node$positionAbsolut4 === void 0 ? void 0 : _node$positionAbsolut4.y) !== null && _node$positionAbsolut3 !== void 0 ? _node$positionAbsolut3 : 0,
      selectNodesOnDrag: props.selectNodesOnDrag,
      onClick: props.onNodeClick,
      onMouseEnter: props.onNodeMouseEnter,
      onMouseMove: props.onNodeMouseMove,
      onMouseLeave: props.onNodeMouseLeave,
      onContextMenu: props.onNodeContextMenu,
      onDoubleClick: props.onNodeDoubleClick,
      selected: !!node.selected,
      isDraggable: isDraggable,
      isSelectable: isSelectable,
      isConnectable: isConnectable,
      resizeObserver: resizeObserver,
      dragHandle: node.dragHandle,
      zIndex: (_node$internalsSymbol = (_node$internalsSymbol2 = node[internalsSymbol]) === null || _node$internalsSymbol2 === void 0 ? void 0 : _node$internalsSymbol2.z) !== null && _node$internalsSymbol !== void 0 ? _node$internalsSymbol : 0,
      isParent: !!((_node$internalsSymbol3 = node[internalsSymbol]) !== null && _node$internalsSymbol3 !== void 0 && _node$internalsSymbol3.isParent),
      noDragClassName: props.noDragClassName,
      noPanClassName: props.noPanClassName,
      initialized: !!node.width && !!node.height
    });
  }));
};

NodeRenderer.displayName = 'NodeRenderer';
var NodeRenderer$1 = /*#__PURE__*/memo(NodeRenderer);

var _oppositePosition;

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var oppositePosition = (_oppositePosition = {}, _defineProperty(_oppositePosition, Position.Left, Position.Right), _defineProperty(_oppositePosition, Position.Right, Position.Left), _defineProperty(_oppositePosition, Position.Top, Position.Bottom), _defineProperty(_oppositePosition, Position.Bottom, Position.Top), _oppositePosition);
var ConnectionLine = (function (_ref) {
  var _fromNode$internalsSy, _fromNode$width, _fromNode$height, _fromNode$positionAbs, _fromNode$positionAbs2;

  var connectionNodeId = _ref.connectionNodeId,
      connectionHandleType = _ref.connectionHandleType,
      connectionLineStyle = _ref.connectionLineStyle,
      _ref$connectionLineTy = _ref.connectionLineType,
      connectionLineType = _ref$connectionLineTy === void 0 ? ConnectionLineType.Bezier : _ref$connectionLineTy,
      isConnectable = _ref.isConnectable,
      CustomConnectionLineComponent = _ref.CustomConnectionLineComponent;

  var _useStore = useStore(useCallback(function (s) {
    return {
      fromNode: s.nodeInternals.get(connectionNodeId),
      handleId: s.connectionHandleId,
      toX: (s.connectionPosition.x - s.transform[0]) / s.transform[2],
      toY: (s.connectionPosition.y - s.transform[1]) / s.transform[2]
    };
  }, [connectionNodeId]), shallow),
      fromNode = _useStore.fromNode,
      handleId = _useStore.handleId,
      toX = _useStore.toX,
      toY = _useStore.toY;

  var fromHandleBounds = fromNode === null || fromNode === void 0 ? void 0 : (_fromNode$internalsSy = fromNode[internalsSymbol]) === null || _fromNode$internalsSy === void 0 ? void 0 : _fromNode$internalsSy.handleBounds;

  if (!fromNode || !isConnectable || !(fromHandleBounds !== null && fromHandleBounds !== void 0 && fromHandleBounds[connectionHandleType])) {
    return null;
  }

  var handleBound = fromHandleBounds[connectionHandleType];
  var fromHandle = handleId ? handleBound.find(function (d) {
    return d.id === handleId;
  }) : handleBound[0];
  var fromHandleX = fromHandle ? fromHandle.x + fromHandle.width / 2 : ((_fromNode$width = fromNode === null || fromNode === void 0 ? void 0 : fromNode.width) !== null && _fromNode$width !== void 0 ? _fromNode$width : 0) / 2;
  var fromHandleY = fromHandle ? fromHandle.y + fromHandle.height / 2 : (_fromNode$height = fromNode === null || fromNode === void 0 ? void 0 : fromNode.height) !== null && _fromNode$height !== void 0 ? _fromNode$height : 0;
  var fromX = ((fromNode === null || fromNode === void 0 ? void 0 : (_fromNode$positionAbs = fromNode.positionAbsolute) === null || _fromNode$positionAbs === void 0 ? void 0 : _fromNode$positionAbs.x) || 0) + fromHandleX;
  var fromY = ((fromNode === null || fromNode === void 0 ? void 0 : (_fromNode$positionAbs2 = fromNode.positionAbsolute) === null || _fromNode$positionAbs2 === void 0 ? void 0 : _fromNode$positionAbs2.y) || 0) + fromHandleY;
  var fromPosition = fromHandle === null || fromHandle === void 0 ? void 0 : fromHandle.position;

  if (!fromPosition) {
    return null;
  }

  var toPosition = oppositePosition[fromPosition];
  var sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition;

  switch (connectionHandleType) {
    case 'source':
      {
        sourceX = fromX;
        sourceY = fromY;
        sourcePosition = fromPosition;
        targetX = toX;
        targetY = toY;
        targetPosition = toPosition;
      }
      break;

    case 'target':
      {
        sourceX = toX;
        sourceY = toY;
        sourcePosition = toPosition;
        targetX = fromX;
        targetY = fromY;
        targetPosition = fromPosition;
      }
      break;
  }

  if (CustomConnectionLineComponent) {
    return /*#__PURE__*/React.createElement("g", {
      className: "react-flow__connection"
    }, /*#__PURE__*/React.createElement(CustomConnectionLineComponent, {
      connectionLineType: connectionLineType,
      connectionLineStyle: connectionLineStyle,
      fromNode: fromNode,
      fromHandle: fromHandle,
      fromX: fromX,
      fromY: fromY,
      toX: toX,
      toY: toY,
      fromPosition: fromPosition,
      toPosition: toPosition,
      // remove in v11
      sourcePosition: sourcePosition,
      targetPosition: targetPosition,
      sourceNode: fromNode,
      sourceHandle: fromHandle,
      targetX: targetX,
      targetY: targetY,
      sourceX: sourceX,
      sourceY: sourceY
    }));
  }

  var dAttr = '';
  var pathParams = {
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition
  };

  if (connectionLineType === ConnectionLineType.Bezier) {
    // we assume the destination position is opposite to the source position
    dAttr = getBezierPath(pathParams);
  } else if (connectionLineType === ConnectionLineType.Step) {
    dAttr = getSmoothStepPath(_objectSpread$4(_objectSpread$4({}, pathParams), {}, {
      borderRadius: 0
    }));
  } else if (connectionLineType === ConnectionLineType.SmoothStep) {
    dAttr = getSmoothStepPath(pathParams);
  } else if (connectionLineType === ConnectionLineType.SimpleBezier) {
    dAttr = getSimpleBezierPath(pathParams);
  } else {
    dAttr = "M".concat(sourceX, ",").concat(sourceY, " ").concat(targetX, ",").concat(targetY);
  }

  return /*#__PURE__*/React.createElement("g", {
    className: "react-flow__connection"
  }, /*#__PURE__*/React.createElement("path", {
    d: dAttr,
    className: "react-flow__connection-path",
    style: connectionLineStyle
  }));
});

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var _MarkerSymbols;

var ArrowSymbol = function ArrowSymbol(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'none' : _ref$color,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth;
  return /*#__PURE__*/React.createElement("polyline", {
    stroke: color,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: strokeWidth,
    fill: "none",
    points: "-5,-4 0,0 -5,4"
  });
};

var ArrowClosedSymbol = function ArrowClosedSymbol(_ref2) {
  var _ref2$color = _ref2.color,
      color = _ref2$color === void 0 ? 'none' : _ref2$color,
      _ref2$strokeWidth = _ref2.strokeWidth,
      strokeWidth = _ref2$strokeWidth === void 0 ? 1 : _ref2$strokeWidth;
  return /*#__PURE__*/React.createElement("polyline", {
    stroke: color,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: strokeWidth,
    fill: color,
    points: "-5,-4 0,0 -5,4 -5,-4"
  });
};

var MarkerSymbols = (_MarkerSymbols = {}, _defineProperty(_MarkerSymbols, MarkerType.Arrow, ArrowSymbol), _defineProperty(_MarkerSymbols, MarkerType.ArrowClosed, ArrowClosedSymbol), _MarkerSymbols);
function useMarkerSymbol(type) {
  var symbol = useMemo(function () {
    var symbolExists = MarkerSymbols.hasOwnProperty(type);

    if (!symbolExists) {
      // @ts-ignore
      if (process.env.NODE_ENV === 'development') {
        console.warn("[React Flow]: Marker type \"".concat(type, "\" doesn't exist. Help: https://reactflow.dev/error#900"));
      }

      return function () {
        return null;
      };
    }

    return MarkerSymbols[type];
  }, [type]);
  return symbol;
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var Marker = function Marker(_ref) {
  var id = _ref.id,
      type = _ref.type,
      color = _ref.color,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 12.5 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 12.5 : _ref$height,
      _ref$markerUnits = _ref.markerUnits,
      markerUnits = _ref$markerUnits === void 0 ? 'strokeWidth' : _ref$markerUnits,
      strokeWidth = _ref.strokeWidth,
      _ref$orient = _ref.orient,
      orient = _ref$orient === void 0 ? 'auto' : _ref$orient;

  var _Symbol = useMarkerSymbol(type);

  return /*#__PURE__*/React.createElement("marker", {
    className: "react-flow__arrowhead",
    id: id,
    markerWidth: "".concat(width),
    markerHeight: "".concat(height),
    viewBox: "-10 -10 20 20",
    markerUnits: markerUnits,
    orient: orient,
    refX: "0",
    refY: "0"
  }, /*#__PURE__*/React.createElement(_Symbol, {
    color: color,
    strokeWidth: strokeWidth
  }));
};

var markerSelector = function markerSelector(_ref2) {
  var defaultColor = _ref2.defaultColor,
      rfId = _ref2.rfId;
  return function (s) {
    var ids = [];
    return s.edges.reduce(function (markers, edge) {
      [edge.markerStart, edge.markerEnd].forEach(function (marker) {
        if (marker && _typeof(marker) === 'object') {
          var markerId = getMarkerId(marker, rfId);

          if (!ids.includes(markerId)) {
            markers.push(_objectSpread$3({
              id: markerId,
              color: marker.color || defaultColor
            }, marker));
            ids.push(markerId);
          }
        }
      });
      return markers;
    }, []).sort(function (a, b) {
      return a.id.localeCompare(b.id);
    });
  };
}; // when you have multiple flows on a page and you hide the first one, the other ones have no markers anymore
// when they do have markers with the same ids. To prevent this the user can pass a unique id to the react flow wrapper
// that we can then use for creating our unique marker ids


var MarkerDefinitions = function MarkerDefinitions(_ref3) {
  var defaultColor = _ref3.defaultColor,
      rfId = _ref3.rfId;
  var markers = useStore(useCallback(markerSelector({
    defaultColor: defaultColor,
    rfId: rfId
  }), [defaultColor, rfId]), // the id includes all marker options, so we just need to look at that part of the marker
  function (a, b) {
    return !(a.length !== b.length || a.some(function (m, i) {
      return m.id !== b[i].id;
    }));
  });
  return /*#__PURE__*/React.createElement("defs", null, markers.map(function (marker) {
    return /*#__PURE__*/React.createElement(Marker, {
      id: marker.id,
      key: marker.id,
      type: marker.type,
      color: marker.color,
      width: marker.width,
      height: marker.height,
      markerUnits: marker.markerUnits,
      strokeWidth: marker.strokeWidth,
      orient: marker.orient
    });
  }));
};

MarkerDefinitions.displayName = 'MarkerDefinitions';
var MarkerDefinitions$1 = /*#__PURE__*/memo(MarkerDefinitions);

var defaultEdgeTree = [{
  level: 0,
  isMaxLevel: true,
  edges: []
}];

function groupEdgesByZLevel(edges, nodeInternals) {
  var elevateEdgesOnSelect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var maxLevel = -1;
  var levelLookup = edges.reduce(function (tree, edge) {
    var hasZIndex = isNumeric(edge.zIndex);
    var z = hasZIndex ? edge.zIndex : 0;

    if (elevateEdgesOnSelect) {
      var _nodeInternals$get, _nodeInternals$get$in, _nodeInternals$get2, _nodeInternals$get2$i;

      z = hasZIndex ? edge.zIndex : Math.max(((_nodeInternals$get = nodeInternals.get(edge.source)) === null || _nodeInternals$get === void 0 ? void 0 : (_nodeInternals$get$in = _nodeInternals$get[internalsSymbol]) === null || _nodeInternals$get$in === void 0 ? void 0 : _nodeInternals$get$in.z) || 0, ((_nodeInternals$get2 = nodeInternals.get(edge.target)) === null || _nodeInternals$get2 === void 0 ? void 0 : (_nodeInternals$get2$i = _nodeInternals$get2[internalsSymbol]) === null || _nodeInternals$get2$i === void 0 ? void 0 : _nodeInternals$get2$i.z) || 0);
    }

    if (tree[z]) {
      tree[z].push(edge);
    } else {
      tree[z] = [edge];
    }

    maxLevel = z > maxLevel ? z : maxLevel;
    return tree;
  }, {});
  var edgeTree = Object.entries(levelLookup).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        edges = _ref2[1];

    var level = +key;
    return {
      edges: edges,
      level: level,
      isMaxLevel: level === maxLevel
    };
  });

  if (edgeTree.length === 0) {
    return defaultEdgeTree;
  }

  return edgeTree;
}

function useVisibleEdges(onlyRenderVisible, nodeInternals, elevateEdgesOnSelect) {
  var edges = useStore(useCallback(function (s) {
    if (!onlyRenderVisible) {
      return s.edges;
    }

    return s.edges.filter(function (e) {
      var sourceNode = nodeInternals.get(e.source);
      var targetNode = nodeInternals.get(e.target);
      return (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.width) && (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.height) && (targetNode === null || targetNode === void 0 ? void 0 : targetNode.width) && (targetNode === null || targetNode === void 0 ? void 0 : targetNode.height) && isEdgeVisible({
        sourcePos: sourceNode.positionAbsolute || {
          x: 0,
          y: 0
        },
        targetPos: targetNode.positionAbsolute || {
          x: 0,
          y: 0
        },
        sourceWidth: sourceNode.width,
        sourceHeight: sourceNode.height,
        targetWidth: targetNode.width,
        targetHeight: targetNode.height,
        width: s.width,
        height: s.height,
        transform: s.transform
      });
    });
  }, [onlyRenderVisible, nodeInternals]));
  return groupEdgesByZLevel(edges, nodeInternals, elevateEdgesOnSelect);
}

var selector$1 = function selector(s) {
  return {
    connectionNodeId: s.connectionNodeId,
    connectionHandleType: s.connectionHandleType,
    nodesConnectable: s.nodesConnectable,
    elementsSelectable: s.elementsSelectable,
    width: s.width,
    height: s.height,
    connectionMode: s.connectionMode,
    nodeInternals: s.nodeInternals
  };
};

var EdgeRenderer = function EdgeRenderer(props) {
  var _useStore = useStore(selector$1, shallow),
      connectionNodeId = _useStore.connectionNodeId,
      connectionHandleType = _useStore.connectionHandleType,
      nodesConnectable = _useStore.nodesConnectable,
      elementsSelectable = _useStore.elementsSelectable,
      width = _useStore.width,
      height = _useStore.height,
      connectionMode = _useStore.connectionMode,
      nodeInternals = _useStore.nodeInternals;

  var edgeTree = useVisibleEdges(props.onlyRenderVisibleElements, nodeInternals, props.elevateEdgesOnSelect);

  if (!width) {
    return null;
  }

  var connectionLineType = props.connectionLineType,
      defaultMarkerColor = props.defaultMarkerColor,
      connectionLineStyle = props.connectionLineStyle,
      connectionLineComponent = props.connectionLineComponent,
      connectionLineContainerStyle = props.connectionLineContainerStyle;
  var renderConnectionLine = connectionNodeId && connectionHandleType;
  return /*#__PURE__*/React.createElement(React.Fragment, null, edgeTree.map(function (_ref) {
    var level = _ref.level,
        edges = _ref.edges,
        isMaxLevel = _ref.isMaxLevel;
    return /*#__PURE__*/React.createElement("svg", {
      key: level,
      style: {
        zIndex: level
      },
      width: width,
      height: height,
      className: "react-flow__edges react-flow__container"
    }, isMaxLevel && /*#__PURE__*/React.createElement(MarkerDefinitions$1, {
      defaultColor: defaultMarkerColor,
      rfId: props.rfId
    }), /*#__PURE__*/React.createElement("g", null, edges.map(function (edge) {
      var _getNodeData = getNodeData(nodeInternals, edge.source),
          _getNodeData2 = _slicedToArray(_getNodeData, 3),
          sourceNodeRect = _getNodeData2[0],
          sourceHandleBounds = _getNodeData2[1],
          sourceIsValid = _getNodeData2[2];

      var _getNodeData3 = getNodeData(nodeInternals, edge.target),
          _getNodeData4 = _slicedToArray(_getNodeData3, 3),
          targetNodeRect = _getNodeData4[0],
          targetHandleBounds = _getNodeData4[1],
          targetIsValid = _getNodeData4[2];

      if (!sourceIsValid || !targetIsValid) {
        return null;
      }

      var edgeType = edge.type || 'default';

      if (!props.edgeTypes[edgeType]) {
        console.warn("[React Flow]: Edge type \"".concat(edgeType, "\" not found. Using fallback type \"default\". Help: https://reactflow.dev/error#300"));
        edgeType = 'default';
      }

      var EdgeComponent = props.edgeTypes[edgeType] || props.edgeTypes["default"]; // when connection type is loose we can define all handles as sources

      var targetNodeHandles = connectionMode === ConnectionMode.Strict ? targetHandleBounds.target : targetHandleBounds.target || targetHandleBounds.source;
      var sourceHandle = getHandle(sourceHandleBounds.source, edge.sourceHandle || null);
      var targetHandle = getHandle(targetNodeHandles, edge.targetHandle || null);
      var sourcePosition = (sourceHandle === null || sourceHandle === void 0 ? void 0 : sourceHandle.position) || Position.Bottom;
      var targetPosition = (targetHandle === null || targetHandle === void 0 ? void 0 : targetHandle.position) || Position.Top;

      if (!sourceHandle) {
        // @ts-ignore
        if (process.env.NODE_ENV === 'development') {
          console.warn("[React Flow]: Couldn't create edge for source handle id: ".concat(edge.sourceHandle, "; edge id: ").concat(edge.id, ". Help: https://reactflow.dev/error#800"));
        }

        return null;
      }

      if (!targetHandle) {
        // @ts-ignore
        if (process.env.NODE_ENV === 'development') {
          console.warn("[React Flow]: Couldn't create edge for target handle id: ".concat(edge.targetHandle, "; edge id: ").concat(edge.id, ". Help: https://reactflow.dev/error#800"));
        }

        return null;
      }

      var _getEdgePositions = getEdgePositions(sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition),
          sourceX = _getEdgePositions.sourceX,
          sourceY = _getEdgePositions.sourceY,
          targetX = _getEdgePositions.targetX,
          targetY = _getEdgePositions.targetY;

      return /*#__PURE__*/React.createElement(EdgeComponent, {
        key: edge.id,
        id: edge.id,
        className: cc([edge.className, props.noPanClassName]),
        type: edgeType,
        data: edge.data,
        selected: !!edge.selected,
        animated: !!edge.animated,
        hidden: !!edge.hidden,
        label: edge.label,
        labelStyle: edge.labelStyle,
        labelShowBg: edge.labelShowBg,
        labelBgStyle: edge.labelBgStyle,
        labelBgPadding: edge.labelBgPadding,
        labelBgBorderRadius: edge.labelBgBorderRadius,
        style: edge.style,
        source: edge.source,
        target: edge.target,
        sourceHandleId: edge.sourceHandle,
        targetHandleId: edge.targetHandle,
        markerEnd: edge.markerEnd,
        markerStart: edge.markerStart,
        sourceX: sourceX,
        sourceY: sourceY,
        targetX: targetX,
        targetY: targetY,
        sourcePosition: sourcePosition,
        targetPosition: targetPosition,
        elementsSelectable: elementsSelectable,
        onEdgeUpdate: props.onEdgeUpdate,
        onContextMenu: props.onEdgeContextMenu,
        onMouseEnter: props.onEdgeMouseEnter,
        onMouseMove: props.onEdgeMouseMove,
        onMouseLeave: props.onEdgeMouseLeave,
        onClick: props.onEdgeClick,
        edgeUpdaterRadius: props.edgeUpdaterRadius,
        onEdgeDoubleClick: props.onEdgeDoubleClick,
        onEdgeUpdateStart: props.onEdgeUpdateStart,
        onEdgeUpdateEnd: props.onEdgeUpdateEnd,
        rfId: props.rfId
      });
    })));
  }), renderConnectionLine && /*#__PURE__*/React.createElement("svg", {
    style: connectionLineContainerStyle,
    width: width,
    height: height,
    className: "react-flow__edges react-flow__connectionline react-flow__container"
  }, /*#__PURE__*/React.createElement(ConnectionLine, {
    connectionNodeId: connectionNodeId,
    connectionHandleType: connectionHandleType,
    connectionLineStyle: connectionLineStyle,
    connectionLineType: connectionLineType,
    isConnectable: nodesConnectable,
    CustomConnectionLineComponent: connectionLineComponent
  })));
};

EdgeRenderer.displayName = 'EdgeRenderer';
var EdgeRenderer$1 = /*#__PURE__*/memo(EdgeRenderer);

var selector = function selector(s) {
  return "translate(".concat(s.transform[0], "px,").concat(s.transform[1], "px) scale(").concat(s.transform[2], ")");
};

function Viewport(_ref) {
  var children = _ref.children;
  var transform = useStore(selector);
  return /*#__PURE__*/React.createElement("div", {
    className: "react-flow__viewport react-flow__container",
    style: {
      transform: transform
    }
  }, children);
}

function useOnInitHandler(onInit) {
  var ReactFlowInstance = useReactFlow();
  var isInitialized = useRef(false);
  useEffect(function () {
    if (!isInitialized.current && ReactFlowInstance.viewportInitialized && onInit) {
      setTimeout(function () {
        return onInit(ReactFlowInstance);
      }, 1);
      isInitialized.current = true;
    }
  }, [onInit, ReactFlowInstance.viewportInitialized]);
}

var GraphView = function GraphView(_ref) {
  var nodeTypes = _ref.nodeTypes,
      edgeTypes = _ref.edgeTypes,
      onMove = _ref.onMove,
      onMoveStart = _ref.onMoveStart,
      onMoveEnd = _ref.onMoveEnd,
      onInit = _ref.onInit,
      onNodeClick = _ref.onNodeClick,
      onEdgeClick = _ref.onEdgeClick,
      onNodeDoubleClick = _ref.onNodeDoubleClick,
      onEdgeDoubleClick = _ref.onEdgeDoubleClick,
      onNodeMouseEnter = _ref.onNodeMouseEnter,
      onNodeMouseMove = _ref.onNodeMouseMove,
      onNodeMouseLeave = _ref.onNodeMouseLeave,
      onNodeContextMenu = _ref.onNodeContextMenu,
      onSelectionContextMenu = _ref.onSelectionContextMenu,
      connectionLineType = _ref.connectionLineType,
      connectionLineStyle = _ref.connectionLineStyle,
      connectionLineComponent = _ref.connectionLineComponent,
      connectionLineContainerStyle = _ref.connectionLineContainerStyle,
      selectionKeyCode = _ref.selectionKeyCode,
      multiSelectionKeyCode = _ref.multiSelectionKeyCode,
      zoomActivationKeyCode = _ref.zoomActivationKeyCode,
      deleteKeyCode = _ref.deleteKeyCode,
      onlyRenderVisibleElements = _ref.onlyRenderVisibleElements,
      elementsSelectable = _ref.elementsSelectable,
      selectNodesOnDrag = _ref.selectNodesOnDrag,
      translateExtent = _ref.translateExtent,
      minZoom = _ref.minZoom,
      maxZoom = _ref.maxZoom,
      defaultZoom = _ref.defaultZoom,
      defaultPosition = _ref.defaultPosition,
      preventScrolling = _ref.preventScrolling,
      defaultMarkerColor = _ref.defaultMarkerColor,
      zoomOnScroll = _ref.zoomOnScroll,
      zoomOnPinch = _ref.zoomOnPinch,
      panOnScroll = _ref.panOnScroll,
      panOnScrollSpeed = _ref.panOnScrollSpeed,
      panOnScrollMode = _ref.panOnScrollMode,
      zoomOnDoubleClick = _ref.zoomOnDoubleClick,
      panOnDrag = _ref.panOnDrag,
      onPaneClick = _ref.onPaneClick,
      onPaneScroll = _ref.onPaneScroll,
      onPaneContextMenu = _ref.onPaneContextMenu,
      onEdgeUpdate = _ref.onEdgeUpdate,
      onEdgeContextMenu = _ref.onEdgeContextMenu,
      onEdgeMouseEnter = _ref.onEdgeMouseEnter,
      onEdgeMouseMove = _ref.onEdgeMouseMove,
      onEdgeMouseLeave = _ref.onEdgeMouseLeave,
      edgeUpdaterRadius = _ref.edgeUpdaterRadius,
      onEdgeUpdateStart = _ref.onEdgeUpdateStart,
      onEdgeUpdateEnd = _ref.onEdgeUpdateEnd,
      noDragClassName = _ref.noDragClassName,
      noWheelClassName = _ref.noWheelClassName,
      noPanClassName = _ref.noPanClassName,
      elevateEdgesOnSelect = _ref.elevateEdgesOnSelect,
      id = _ref.id;
  useOnInitHandler(onInit);
  return /*#__PURE__*/React.createElement(FlowRenderer$1, {
    onPaneClick: onPaneClick,
    onPaneContextMenu: onPaneContextMenu,
    onPaneScroll: onPaneScroll,
    deleteKeyCode: deleteKeyCode,
    selectionKeyCode: selectionKeyCode,
    multiSelectionKeyCode: multiSelectionKeyCode,
    zoomActivationKeyCode: zoomActivationKeyCode,
    elementsSelectable: elementsSelectable,
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    panOnDrag: panOnDrag,
    translateExtent: translateExtent,
    minZoom: minZoom,
    maxZoom: maxZoom,
    defaultZoom: defaultZoom,
    defaultPosition: defaultPosition,
    onSelectionContextMenu: onSelectionContextMenu,
    preventScrolling: preventScrolling,
    noDragClassName: noDragClassName,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName
  }, /*#__PURE__*/React.createElement(Viewport, null, /*#__PURE__*/React.createElement(EdgeRenderer$1, {
    edgeTypes: edgeTypes,
    onEdgeClick: onEdgeClick,
    onEdgeDoubleClick: onEdgeDoubleClick,
    connectionLineType: connectionLineType,
    connectionLineStyle: connectionLineStyle,
    connectionLineComponent: connectionLineComponent,
    connectionLineContainerStyle: connectionLineContainerStyle,
    onEdgeUpdate: onEdgeUpdate,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    onEdgeContextMenu: onEdgeContextMenu,
    onEdgeMouseEnter: onEdgeMouseEnter,
    onEdgeMouseMove: onEdgeMouseMove,
    onEdgeMouseLeave: onEdgeMouseLeave,
    onEdgeUpdateStart: onEdgeUpdateStart,
    onEdgeUpdateEnd: onEdgeUpdateEnd,
    edgeUpdaterRadius: edgeUpdaterRadius,
    defaultMarkerColor: defaultMarkerColor,
    noPanClassName: noPanClassName,
    elevateEdgesOnSelect: !!elevateEdgesOnSelect,
    rfId: id
  }), /*#__PURE__*/React.createElement(NodeRenderer$1, {
    nodeTypes: nodeTypes,
    onNodeClick: onNodeClick,
    onNodeDoubleClick: onNodeDoubleClick,
    onNodeMouseEnter: onNodeMouseEnter,
    onNodeMouseMove: onNodeMouseMove,
    onNodeMouseLeave: onNodeMouseLeave,
    onNodeContextMenu: onNodeContextMenu,
    selectNodesOnDrag: selectNodesOnDrag,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    noPanClassName: noPanClassName,
    noDragClassName: noDragClassName
  })));
};

GraphView.displayName = 'GraphView';
var GraphView$1 = /*#__PURE__*/memo(GraphView);

var GroupNode = function GroupNode() {
  return null;
};

GroupNode.displayName = 'GroupNode';

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var wrapNode = (function (NodeComponent) {
  var NodeWrapper = function NodeWrapper(_ref) {
    var id = _ref.id,
        type = _ref.type,
        data = _ref.data,
        xPos = _ref.xPos,
        yPos = _ref.yPos,
        selected = _ref.selected,
        onClick = _ref.onClick,
        onMouseEnter = _ref.onMouseEnter,
        onMouseMove = _ref.onMouseMove,
        onMouseLeave = _ref.onMouseLeave,
        onContextMenu = _ref.onContextMenu,
        onDoubleClick = _ref.onDoubleClick,
        style = _ref.style,
        className = _ref.className,
        isDraggable = _ref.isDraggable,
        isSelectable = _ref.isSelectable,
        isConnectable = _ref.isConnectable,
        selectNodesOnDrag = _ref.selectNodesOnDrag,
        sourcePosition = _ref.sourcePosition,
        targetPosition = _ref.targetPosition,
        hidden = _ref.hidden,
        resizeObserver = _ref.resizeObserver,
        dragHandle = _ref.dragHandle,
        zIndex = _ref.zIndex,
        isParent = _ref.isParent,
        noPanClassName = _ref.noPanClassName,
        noDragClassName = _ref.noDragClassName,
        initialized = _ref.initialized;
    var store = useStoreApi();
    var nodeRef = useRef(null);
    var prevSourcePosition = useRef(sourcePosition);
    var prevTargetPosition = useRef(targetPosition);
    var prevType = useRef(type);
    var hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
    var onMouseEnterHandler = getMouseHandler$1(id, store.getState, onMouseEnter);
    var onMouseMoveHandler = getMouseHandler$1(id, store.getState, onMouseMove);
    var onMouseLeaveHandler = getMouseHandler$1(id, store.getState, onMouseLeave);
    var onContextMenuHandler = getMouseHandler$1(id, store.getState, onContextMenu);
    var onDoubleClickHandler = getMouseHandler$1(id, store.getState, onDoubleClick);

    var onSelectNodeHandler = function onSelectNodeHandler(event) {
      if (isSelectable && (!selectNodesOnDrag || !isDraggable)) {
        // this handler gets called within the drag start event when selectNodesOnDrag=true
        handleNodeClick({
          id: id,
          store: store
        });
      }

      if (onClick) {
        var node = store.getState().nodeInternals.get(id);
        onClick(event, _objectSpread$2({}, node));
      }
    };

    useEffect(function () {
      if (nodeRef.current && !hidden) {
        var currNode = nodeRef.current;
        resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(currNode);
        return function () {
          return resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.unobserve(currNode);
        };
      }
    }, [hidden]);
    useEffect(function () {
      // when the user programmatically changes the source or handle position, we re-initialize the node
      var typeChanged = prevType.current !== type;
      var sourcePosChanged = prevSourcePosition.current !== sourcePosition;
      var targetPosChanged = prevTargetPosition.current !== targetPosition;

      if (nodeRef.current && (typeChanged || sourcePosChanged || targetPosChanged)) {
        if (typeChanged) {
          prevType.current = type;
        }

        if (sourcePosChanged) {
          prevSourcePosition.current = sourcePosition;
        }

        if (targetPosChanged) {
          prevTargetPosition.current = targetPosition;
        }

        store.getState().updateNodeDimensions([{
          id: id,
          nodeElement: nodeRef.current,
          forceUpdate: true
        }]);
      }
    }, [id, type, sourcePosition, targetPosition]);
    var dragging = useDrag({
      nodeRef: nodeRef,
      disabled: hidden || !isDraggable,
      noDragClassName: noDragClassName,
      handleSelector: dragHandle,
      nodeId: id,
      isSelectable: isSelectable,
      selectNodesOnDrag: selectNodesOnDrag
    });

    if (hidden) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: cc(['react-flow__node', "react-flow__node-".concat(type), noPanClassName, className, {
        selected: selected,
        selectable: isSelectable,
        parent: isParent
      }]),
      ref: nodeRef,
      style: _objectSpread$2({
        zIndex: zIndex,
        transform: "translate(".concat(xPos, "px,").concat(yPos, "px)"),
        pointerEvents: hasPointerEvents ? 'all' : 'none',
        visibility: initialized ? 'visible' : 'hidden'
      }, style),
      onMouseEnter: onMouseEnterHandler,
      onMouseMove: onMouseMoveHandler,
      onMouseLeave: onMouseLeaveHandler,
      onContextMenu: onContextMenuHandler,
      onClick: onSelectNodeHandler,
      onDoubleClick: onDoubleClickHandler,
      "data-testid": "rf__node-".concat(id),
      "data-id": id
    }, /*#__PURE__*/React.createElement(Provider, {
      value: id
    }, /*#__PURE__*/React.createElement(NodeComponent, {
      id: id,
      data: data,
      type: type,
      xPos: xPos,
      yPos: yPos,
      selected: selected,
      isConnectable: isConnectable,
      sourcePosition: sourcePosition,
      targetPosition: targetPosition,
      dragging: dragging,
      dragHandle: dragHandle,
      zIndex: zIndex
    })));
  };

  NodeWrapper.displayName = 'NodeWrapper';
  return /*#__PURE__*/memo(NodeWrapper);
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function createNodeTypes(nodeTypes) {
  var standardTypes = {
    input: wrapNode(nodeTypes.input || InputNode$1),
    "default": wrapNode(nodeTypes["default"] || DefaultNode$1),
    output: wrapNode(nodeTypes.output || OutputNode$1),
    group: wrapNode(nodeTypes.group || GroupNode)
  };
  var wrappedTypes = {};
  var specialTypes = Object.keys(nodeTypes).filter(function (k) {
    return !['input', 'default', 'output', 'group'].includes(k);
  }).reduce(function (res, key) {
    res[key] = wrapNode(nodeTypes[key] || DefaultNode$1);
    return res;
  }, wrappedTypes);
  return _objectSpread$1(_objectSpread$1({}, standardTypes), specialTypes);
}

function useNodeOrEdgeTypes(nodeOrEdgeTypes, createTypes) {
  var typesKeysRef = useRef(null);
  var typesParsed = useMemo(function () {
    // @ts-ignore
    if (process.env.NODE_ENV === 'development') {
      var typeKeys = Object.keys(nodeOrEdgeTypes);

      if (shallow(typesKeysRef.current, typeKeys)) {
        console.warn("[React Flow]: It looks like you have created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them. Help: https://reactflow.dev/error#200");
      }

      typesKeysRef.current = typeKeys;
    }

    return createTypes(nodeOrEdgeTypes);
  }, [nodeOrEdgeTypes]);
  return typesParsed;
}

var Wrapper = function Wrapper(_ref) {
  var children = _ref.children;
  var isWrapped = true;

  try {
    useStoreApi();
  } catch (e) {
    isWrapped = false;
  }

  if (isWrapped) {
    // we need to wrap it with a fragment because it's not allowed for children to be a ReactNode
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }

  return /*#__PURE__*/React.createElement(Provider$1, {
    createStore: createStore
  }, children);
};

Wrapper.displayName = 'ReactFlowWrapper';

var _excluded = ["nodes", "edges", "defaultNodes", "defaultEdges", "className", "nodeTypes", "edgeTypes", "onNodeClick", "onEdgeClick", "onInit", "onMove", "onMoveStart", "onMoveEnd", "onConnect", "onConnectStart", "onConnectStop", "onConnectEnd", "onClickConnectStart", "onClickConnectStop", "onClickConnectEnd", "onNodeMouseEnter", "onNodeMouseMove", "onNodeMouseLeave", "onNodeContextMenu", "onNodeDoubleClick", "onNodeDragStart", "onNodeDrag", "onNodeDragStop", "onNodesDelete", "onEdgesDelete", "onSelectionChange", "onSelectionDragStart", "onSelectionDrag", "onSelectionDragStop", "onSelectionContextMenu", "connectionMode", "connectionLineType", "connectionLineStyle", "connectionLineComponent", "connectionLineContainerStyle", "deleteKeyCode", "selectionKeyCode", "multiSelectionKeyCode", "zoomActivationKeyCode", "snapToGrid", "snapGrid", "onlyRenderVisibleElements", "selectNodesOnDrag", "nodesDraggable", "nodesConnectable", "elementsSelectable", "minZoom", "maxZoom", "defaultZoom", "defaultPosition", "translateExtent", "preventScrolling", "nodeExtent", "defaultMarkerColor", "zoomOnScroll", "zoomOnPinch", "panOnScroll", "panOnScrollSpeed", "panOnScrollMode", "zoomOnDoubleClick", "panOnDrag", "onPaneClick", "onPaneScroll", "onPaneContextMenu", "children", "onEdgeUpdate", "onEdgeContextMenu", "onEdgeDoubleClick", "onEdgeMouseEnter", "onEdgeMouseMove", "onEdgeMouseLeave", "onEdgeUpdateStart", "onEdgeUpdateEnd", "edgeUpdaterRadius", "onNodesChange", "onEdgesChange", "noDragClassName", "noWheelClassName", "noPanClassName", "fitView", "fitViewOptions", "connectOnClick", "attributionPosition", "proOptions", "defaultEdgeOptions", "elevateEdgesOnSelect"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var defaultNodeTypes = {
  input: InputNode$1,
  "default": DefaultNode$1,
  output: OutputNode$1
};
var defaultEdgeTypes = {
  "default": BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
  simplebezier: SimpleBezierEdge
};
var initSnapGrid = [15, 15];
var initDefaultPosition = [0, 0];
var ReactFlow = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var nodes = _ref.nodes,
      edges = _ref.edges,
      defaultNodes = _ref.defaultNodes,
      defaultEdges = _ref.defaultEdges,
      className = _ref.className,
      _ref$nodeTypes = _ref.nodeTypes,
      nodeTypes = _ref$nodeTypes === void 0 ? defaultNodeTypes : _ref$nodeTypes,
      _ref$edgeTypes = _ref.edgeTypes,
      edgeTypes = _ref$edgeTypes === void 0 ? defaultEdgeTypes : _ref$edgeTypes,
      onNodeClick = _ref.onNodeClick,
      onEdgeClick = _ref.onEdgeClick,
      onInit = _ref.onInit,
      onMove = _ref.onMove,
      onMoveStart = _ref.onMoveStart,
      onMoveEnd = _ref.onMoveEnd,
      onConnect = _ref.onConnect,
      onConnectStart = _ref.onConnectStart,
      onConnectStop = _ref.onConnectStop,
      onConnectEnd = _ref.onConnectEnd,
      onClickConnectStart = _ref.onClickConnectStart,
      onClickConnectStop = _ref.onClickConnectStop,
      onClickConnectEnd = _ref.onClickConnectEnd,
      onNodeMouseEnter = _ref.onNodeMouseEnter,
      onNodeMouseMove = _ref.onNodeMouseMove,
      onNodeMouseLeave = _ref.onNodeMouseLeave,
      onNodeContextMenu = _ref.onNodeContextMenu,
      onNodeDoubleClick = _ref.onNodeDoubleClick,
      onNodeDragStart = _ref.onNodeDragStart,
      onNodeDrag = _ref.onNodeDrag,
      onNodeDragStop = _ref.onNodeDragStop,
      onNodesDelete = _ref.onNodesDelete,
      onEdgesDelete = _ref.onEdgesDelete,
      onSelectionChange = _ref.onSelectionChange,
      onSelectionDragStart = _ref.onSelectionDragStart,
      onSelectionDrag = _ref.onSelectionDrag,
      onSelectionDragStop = _ref.onSelectionDragStop,
      onSelectionContextMenu = _ref.onSelectionContextMenu,
      _ref$connectionMode = _ref.connectionMode,
      connectionMode = _ref$connectionMode === void 0 ? ConnectionMode.Strict : _ref$connectionMode,
      _ref$connectionLineTy = _ref.connectionLineType,
      connectionLineType = _ref$connectionLineTy === void 0 ? ConnectionLineType.Bezier : _ref$connectionLineTy,
      connectionLineStyle = _ref.connectionLineStyle,
      connectionLineComponent = _ref.connectionLineComponent,
      connectionLineContainerStyle = _ref.connectionLineContainerStyle,
      _ref$deleteKeyCode = _ref.deleteKeyCode,
      deleteKeyCode = _ref$deleteKeyCode === void 0 ? 'Backspace' : _ref$deleteKeyCode,
      _ref$selectionKeyCode = _ref.selectionKeyCode,
      selectionKeyCode = _ref$selectionKeyCode === void 0 ? 'Shift' : _ref$selectionKeyCode,
      _ref$multiSelectionKe = _ref.multiSelectionKeyCode,
      multiSelectionKeyCode = _ref$multiSelectionKe === void 0 ? 'Meta' : _ref$multiSelectionKe,
      _ref$zoomActivationKe = _ref.zoomActivationKeyCode,
      zoomActivationKeyCode = _ref$zoomActivationKe === void 0 ? 'Meta' : _ref$zoomActivationKe,
      _ref$snapToGrid = _ref.snapToGrid,
      snapToGrid = _ref$snapToGrid === void 0 ? false : _ref$snapToGrid,
      _ref$snapGrid = _ref.snapGrid,
      snapGrid = _ref$snapGrid === void 0 ? initSnapGrid : _ref$snapGrid,
      _ref$onlyRenderVisibl = _ref.onlyRenderVisibleElements,
      onlyRenderVisibleElements = _ref$onlyRenderVisibl === void 0 ? false : _ref$onlyRenderVisibl,
      _ref$selectNodesOnDra = _ref.selectNodesOnDrag,
      selectNodesOnDrag = _ref$selectNodesOnDra === void 0 ? true : _ref$selectNodesOnDra,
      nodesDraggable = _ref.nodesDraggable,
      nodesConnectable = _ref.nodesConnectable,
      elementsSelectable = _ref.elementsSelectable,
      _ref$minZoom = _ref.minZoom,
      minZoom = _ref$minZoom === void 0 ? 0.5 : _ref$minZoom,
      _ref$maxZoom = _ref.maxZoom,
      maxZoom = _ref$maxZoom === void 0 ? 2 : _ref$maxZoom,
      _ref$defaultZoom = _ref.defaultZoom,
      defaultZoom = _ref$defaultZoom === void 0 ? 1 : _ref$defaultZoom,
      _ref$defaultPosition = _ref.defaultPosition,
      defaultPosition = _ref$defaultPosition === void 0 ? initDefaultPosition : _ref$defaultPosition,
      _ref$translateExtent = _ref.translateExtent,
      translateExtent = _ref$translateExtent === void 0 ? infiniteExtent : _ref$translateExtent,
      _ref$preventScrolling = _ref.preventScrolling,
      preventScrolling = _ref$preventScrolling === void 0 ? true : _ref$preventScrolling,
      nodeExtent = _ref.nodeExtent,
      _ref$defaultMarkerCol = _ref.defaultMarkerColor,
      defaultMarkerColor = _ref$defaultMarkerCol === void 0 ? '#b1b1b7' : _ref$defaultMarkerCol,
      _ref$zoomOnScroll = _ref.zoomOnScroll,
      zoomOnScroll = _ref$zoomOnScroll === void 0 ? true : _ref$zoomOnScroll,
      _ref$zoomOnPinch = _ref.zoomOnPinch,
      zoomOnPinch = _ref$zoomOnPinch === void 0 ? true : _ref$zoomOnPinch,
      _ref$panOnScroll = _ref.panOnScroll,
      panOnScroll = _ref$panOnScroll === void 0 ? false : _ref$panOnScroll,
      _ref$panOnScrollSpeed = _ref.panOnScrollSpeed,
      panOnScrollSpeed = _ref$panOnScrollSpeed === void 0 ? 0.5 : _ref$panOnScrollSpeed,
      _ref$panOnScrollMode = _ref.panOnScrollMode,
      panOnScrollMode = _ref$panOnScrollMode === void 0 ? PanOnScrollMode.Free : _ref$panOnScrollMode,
      _ref$zoomOnDoubleClic = _ref.zoomOnDoubleClick,
      zoomOnDoubleClick = _ref$zoomOnDoubleClic === void 0 ? true : _ref$zoomOnDoubleClic,
      _ref$panOnDrag = _ref.panOnDrag,
      panOnDrag = _ref$panOnDrag === void 0 ? true : _ref$panOnDrag,
      onPaneClick = _ref.onPaneClick,
      onPaneScroll = _ref.onPaneScroll,
      onPaneContextMenu = _ref.onPaneContextMenu,
      children = _ref.children,
      onEdgeUpdate = _ref.onEdgeUpdate,
      onEdgeContextMenu = _ref.onEdgeContextMenu,
      onEdgeDoubleClick = _ref.onEdgeDoubleClick,
      onEdgeMouseEnter = _ref.onEdgeMouseEnter,
      onEdgeMouseMove = _ref.onEdgeMouseMove,
      onEdgeMouseLeave = _ref.onEdgeMouseLeave,
      onEdgeUpdateStart = _ref.onEdgeUpdateStart,
      onEdgeUpdateEnd = _ref.onEdgeUpdateEnd,
      _ref$edgeUpdaterRadiu = _ref.edgeUpdaterRadius,
      edgeUpdaterRadius = _ref$edgeUpdaterRadiu === void 0 ? 10 : _ref$edgeUpdaterRadiu,
      onNodesChange = _ref.onNodesChange,
      onEdgesChange = _ref.onEdgesChange,
      _ref$noDragClassName = _ref.noDragClassName,
      noDragClassName = _ref$noDragClassName === void 0 ? 'nodrag' : _ref$noDragClassName,
      _ref$noWheelClassName = _ref.noWheelClassName,
      noWheelClassName = _ref$noWheelClassName === void 0 ? 'nowheel' : _ref$noWheelClassName,
      _ref$noPanClassName = _ref.noPanClassName,
      noPanClassName = _ref$noPanClassName === void 0 ? 'nopan' : _ref$noPanClassName,
      _ref$fitView = _ref.fitView,
      fitView = _ref$fitView === void 0 ? false : _ref$fitView,
      fitViewOptions = _ref.fitViewOptions,
      _ref$connectOnClick = _ref.connectOnClick,
      connectOnClick = _ref$connectOnClick === void 0 ? true : _ref$connectOnClick,
      attributionPosition = _ref.attributionPosition,
      proOptions = _ref.proOptions,
      defaultEdgeOptions = _ref.defaultEdgeOptions,
      _ref$elevateEdgesOnSe = _ref.elevateEdgesOnSelect,
      elevateEdgesOnSelect = _ref$elevateEdgesOnSe === void 0 ? false : _ref$elevateEdgesOnSe,
      rest = _objectWithoutProperties(_ref, _excluded);

  var nodeTypesWrapped = useNodeOrEdgeTypes(nodeTypes, createNodeTypes);
  var edgeTypesWrapped = useNodeOrEdgeTypes(edgeTypes, createEdgeTypes);
  return /*#__PURE__*/React.createElement("div", _objectSpread(_objectSpread({}, rest), {}, {
    ref: ref,
    className: cc(['react-flow', className])
  }), /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(GraphView$1, {
    onInit: onInit,
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    onNodeClick: onNodeClick,
    onEdgeClick: onEdgeClick,
    onNodeMouseEnter: onNodeMouseEnter,
    onNodeMouseMove: onNodeMouseMove,
    onNodeMouseLeave: onNodeMouseLeave,
    onNodeContextMenu: onNodeContextMenu,
    onNodeDoubleClick: onNodeDoubleClick,
    nodeTypes: nodeTypesWrapped,
    edgeTypes: edgeTypesWrapped,
    connectionLineType: connectionLineType,
    connectionLineStyle: connectionLineStyle,
    connectionLineComponent: connectionLineComponent,
    connectionLineContainerStyle: connectionLineContainerStyle,
    selectionKeyCode: selectionKeyCode,
    deleteKeyCode: deleteKeyCode,
    multiSelectionKeyCode: multiSelectionKeyCode,
    zoomActivationKeyCode: zoomActivationKeyCode,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    selectNodesOnDrag: selectNodesOnDrag,
    translateExtent: translateExtent,
    minZoom: minZoom,
    maxZoom: maxZoom,
    defaultZoom: defaultZoom,
    defaultPosition: defaultPosition,
    preventScrolling: preventScrolling,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    panOnDrag: panOnDrag,
    onPaneClick: onPaneClick,
    onPaneScroll: onPaneScroll,
    onPaneContextMenu: onPaneContextMenu,
    onSelectionContextMenu: onSelectionContextMenu,
    onEdgeUpdate: onEdgeUpdate,
    onEdgeContextMenu: onEdgeContextMenu,
    onEdgeDoubleClick: onEdgeDoubleClick,
    onEdgeMouseEnter: onEdgeMouseEnter,
    onEdgeMouseMove: onEdgeMouseMove,
    onEdgeMouseLeave: onEdgeMouseLeave,
    onEdgeUpdateStart: onEdgeUpdateStart,
    onEdgeUpdateEnd: onEdgeUpdateEnd,
    edgeUpdaterRadius: edgeUpdaterRadius,
    defaultMarkerColor: defaultMarkerColor,
    noDragClassName: noDragClassName,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName,
    elevateEdgesOnSelect: elevateEdgesOnSelect,
    id: rest === null || rest === void 0 ? void 0 : rest.id
  }), /*#__PURE__*/React.createElement(StoreUpdater, {
    nodes: nodes,
    edges: edges,
    defaultNodes: defaultNodes,
    defaultEdges: defaultEdges,
    onConnect: onConnect,
    onConnectStart: onConnectStart,
    onConnectStop: onConnectStop,
    onConnectEnd: onConnectEnd,
    onClickConnectStart: onClickConnectStart,
    onClickConnectStop: onClickConnectStop,
    onClickConnectEnd: onClickConnectEnd,
    nodesDraggable: nodesDraggable,
    nodesConnectable: nodesConnectable,
    elementsSelectable: elementsSelectable,
    minZoom: minZoom,
    maxZoom: maxZoom,
    nodeExtent: nodeExtent,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    snapToGrid: snapToGrid,
    snapGrid: snapGrid,
    connectionMode: connectionMode,
    translateExtent: translateExtent,
    connectOnClick: connectOnClick,
    defaultEdgeOptions: defaultEdgeOptions,
    fitView: fitView,
    fitViewOptions: fitViewOptions,
    onNodesDelete: onNodesDelete,
    onEdgesDelete: onEdgesDelete,
    onNodeDragStart: onNodeDragStart,
    onNodeDrag: onNodeDrag,
    onNodeDragStop: onNodeDragStop,
    onSelectionDrag: onSelectionDrag,
    onSelectionDragStart: onSelectionDragStart,
    onSelectionDragStop: onSelectionDragStop
  }), onSelectionChange && /*#__PURE__*/React.createElement(SelectionListener$1, {
    onSelectionChange: onSelectionChange
  }), children, /*#__PURE__*/React.createElement(Attribution, {
    proOptions: proOptions,
    position: attributionPosition
  })));
});
ReactFlow.displayName = 'ReactFlow';

var ReactFlowProvider = function ReactFlowProvider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(Provider$1, {
    createStore: createStore
  }, children);
};

ReactFlowProvider.displayName = 'ReactFlowProvider';

function createUseItemsState(applyChanges) {
  return function (initialItems) {
    var _useState = useState(initialItems),
        _useState2 = _slicedToArray(_useState, 2),
        items = _useState2[0],
        setItems = _useState2[1];

    var onItemsChange = useCallback(function (changes) {
      return setItems(function (items) {
        return applyChanges(changes, items);
      });
    }, []);
    return [items, setItems, onItemsChange];
  };
}

var useNodesState = createUseItemsState(applyNodeChanges);
var useEdgesState = createUseItemsState(applyEdgeChanges);

export { BezierEdge, EdgeText$1 as EdgeText, Handle$1 as Handle, ReactFlowProvider, SimpleBezierEdge, SmoothStepEdge, StepEdge, StraightEdge, ReactFlow as default, getBezierCenter as getBezierEdgeCenter, getBezierPath, getCenter as getEdgeCenter, getMarkerEnd, getSimpleBezierCenter as getSimpleBezierEdgeCenter, getSimpleBezierPath, getSmoothStepPath, useEdgesState, useKeyPress, useNodesState };
//# sourceMappingURL=index.js.map
