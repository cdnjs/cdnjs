import React, { memo } from 'react';
import cc from 'classcat';
import shallow from 'zustand/shallow';
import { b as useStore, I as getBoundsofRects, o as getRectOfNodes } from './index-a12c80bd.js';
import 'zustand';
import 'zustand/context';
import 'd3-zoom';

var MiniMapNode = function MiniMapNode(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style,
      color = _ref.color,
      strokeColor = _ref.strokeColor,
      strokeWidth = _ref.strokeWidth,
      className = _ref.className,
      borderRadius = _ref.borderRadius,
      shapeRendering = _ref.shapeRendering;

  var _ref2 = style || {},
      background = _ref2.background,
      backgroundColor = _ref2.backgroundColor;

  var fill = color || background || backgroundColor;
  return /*#__PURE__*/React.createElement("rect", {
    className: cc(['react-flow__minimap-node', className]),
    x: x,
    y: y,
    rx: borderRadius,
    ry: borderRadius,
    width: width,
    height: height,
    fill: fill,
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    shapeRendering: shapeRendering
  });
};

MiniMapNode.displayName = 'MiniMapNode';
var MiniMapNode$1 = /*#__PURE__*/memo(MiniMapNode);

var defaultWidth = 200;
var defaultHeight = 150;

var selector = function selector(s) {
  return {
    viewBBox: {
      x: -s.transform[0] / s.transform[2],
      y: -s.transform[1] / s.transform[2],
      width: s.width / s.transform[2],
      height: s.height / s.transform[2]
    },
    nodes: Array.from(s.nodeInternals.values())
  };
};

var getAttrFunction = function getAttrFunction(func) {
  return func instanceof Function ? func : function () {
    return func;
  };
};

var MiniMap = function MiniMap(_ref) {
  var _style$width, _style$height;

  var style = _ref.style,
      className = _ref.className,
      _ref$nodeStrokeColor = _ref.nodeStrokeColor,
      nodeStrokeColor = _ref$nodeStrokeColor === void 0 ? '#555' : _ref$nodeStrokeColor,
      _ref$nodeColor = _ref.nodeColor,
      nodeColor = _ref$nodeColor === void 0 ? '#fff' : _ref$nodeColor,
      _ref$nodeClassName = _ref.nodeClassName,
      nodeClassName = _ref$nodeClassName === void 0 ? '' : _ref$nodeClassName,
      _ref$nodeBorderRadius = _ref.nodeBorderRadius,
      nodeBorderRadius = _ref$nodeBorderRadius === void 0 ? 5 : _ref$nodeBorderRadius,
      _ref$nodeStrokeWidth = _ref.nodeStrokeWidth,
      nodeStrokeWidth = _ref$nodeStrokeWidth === void 0 ? 2 : _ref$nodeStrokeWidth,
      _ref$maskColor = _ref.maskColor,
      maskColor = _ref$maskColor === void 0 ? 'rgb(240, 242, 243, 0.7)' : _ref$maskColor;

  var _useStore = useStore(selector, shallow),
      viewBBox = _useStore.viewBBox,
      nodes = _useStore.nodes;

  var elementWidth = (_style$width = style === null || style === void 0 ? void 0 : style.width) !== null && _style$width !== void 0 ? _style$width : defaultWidth;
  var elementHeight = (_style$height = style === null || style === void 0 ? void 0 : style.height) !== null && _style$height !== void 0 ? _style$height : defaultHeight;
  var nodeColorFunc = getAttrFunction(nodeColor);
  var nodeStrokeColorFunc = getAttrFunction(nodeStrokeColor);
  var nodeClassNameFunc = getAttrFunction(nodeClassName);
  var boundingRect = nodes.length > 0 ? getBoundsofRects(getRectOfNodes(nodes), viewBBox) : viewBBox;
  var scaledWidth = boundingRect.width / elementWidth;
  var scaledHeight = boundingRect.height / elementHeight;
  var viewScale = Math.max(scaledWidth, scaledHeight);
  var viewWidth = viewScale * elementWidth;
  var viewHeight = viewScale * elementHeight;
  var offset = 5 * viewScale;
  var x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
  var y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
  var width = viewWidth + offset * 2;
  var height = viewHeight + offset * 2;
  var shapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision';
  return /*#__PURE__*/React.createElement("svg", {
    width: elementWidth,
    height: elementHeight,
    viewBox: "".concat(x, " ").concat(y, " ").concat(width, " ").concat(height),
    style: style,
    className: cc(['react-flow__minimap', className])
  }, nodes.filter(function (node) {
    return !node.hidden && node.width && node.height;
  }).map(function (node) {
    var _node$positionAbsolut, _node$positionAbsolut2, _node$positionAbsolut3, _node$positionAbsolut4;

    return /*#__PURE__*/React.createElement(MiniMapNode$1, {
      key: node.id,
      x: (_node$positionAbsolut = (_node$positionAbsolut2 = node.positionAbsolute) === null || _node$positionAbsolut2 === void 0 ? void 0 : _node$positionAbsolut2.x) !== null && _node$positionAbsolut !== void 0 ? _node$positionAbsolut : 0,
      y: (_node$positionAbsolut3 = (_node$positionAbsolut4 = node.positionAbsolute) === null || _node$positionAbsolut4 === void 0 ? void 0 : _node$positionAbsolut4.y) !== null && _node$positionAbsolut3 !== void 0 ? _node$positionAbsolut3 : 0,
      width: node.width,
      height: node.height,
      style: node.style,
      className: nodeClassNameFunc(node),
      color: nodeColorFunc(node),
      borderRadius: nodeBorderRadius,
      strokeColor: nodeStrokeColorFunc(node),
      strokeWidth: nodeStrokeWidth,
      shapeRendering: shapeRendering
    });
  }), /*#__PURE__*/React.createElement("path", {
    className: "react-flow__minimap-mask",
    d: "M".concat(x - offset, ",").concat(y - offset, "h").concat(width + offset * 2, "v").concat(height + offset * 2, "h").concat(-width - offset * 2, "z\n        M").concat(viewBBox.x, ",").concat(viewBBox.y, "h").concat(viewBBox.width, "v").concat(viewBBox.height, "h").concat(-viewBBox.width, "z"),
    fill: maskColor,
    fillRule: "evenodd"
  }));
};

MiniMap.displayName = 'MiniMap';
var index = /*#__PURE__*/memo(MiniMap);

export { index as default };
//# sourceMappingURL=index2.js.map
