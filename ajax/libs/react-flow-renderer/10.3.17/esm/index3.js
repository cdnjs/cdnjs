import { a as _defineProperty, H as BackgroundVariant, _ as _slicedToArray, b as useStore } from './index-a12c80bd.js';
import React, { memo, useRef, useState, useEffect } from 'react';
import cc from 'classcat';
import 'zustand';
import 'zustand/context';
import 'd3-zoom';

var createGridLinesPath = function createGridLinesPath(size, strokeWidth, stroke) {
  return /*#__PURE__*/React.createElement("path", {
    stroke: stroke,
    strokeWidth: strokeWidth,
    d: "M".concat(size / 2, " 0 V").concat(size, " M0 ").concat(size / 2, " H").concat(size)
  });
};
var createGridDotsPath = function createGridDotsPath(size, fill) {
  return /*#__PURE__*/React.createElement("circle", {
    cx: size,
    cy: size,
    r: size,
    fill: fill
  });
};

var _defaultColors;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var defaultColors = (_defaultColors = {}, _defineProperty(_defaultColors, BackgroundVariant.Dots, '#81818a'), _defineProperty(_defaultColors, BackgroundVariant.Lines, '#eee'), _defaultColors);

var transformSelector = function transformSelector(s) {
  return s.transform;
};

var Background = function Background(_ref) {
  var _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? BackgroundVariant.Dots : _ref$variant,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 15 : _ref$gap,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 0.4 : _ref$size,
      color = _ref.color,
      style = _ref.style,
      className = _ref.className;
  var ref = useRef(null);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      patternId = _useState2[0],
      setPatternId = _useState2[1];

  var _useStore = useStore(transformSelector),
      _useStore2 = _slicedToArray(_useStore, 3),
      tX = _useStore2[0],
      tY = _useStore2[1],
      tScale = _useStore2[2];

  useEffect(function () {
    // when there are multiple flows on a page we need to make sure that every background gets its own pattern.
    var bgs = document.querySelectorAll('.react-flow__background');
    var index = Array.from(bgs).findIndex(function (bg) {
      return bg === ref.current;
    });
    setPatternId("pattern-".concat(index));
  }, []);
  var scaledGap = gap * tScale || 1;
  var xOffset = tX % scaledGap;
  var yOffset = tY % scaledGap;
  var isLines = variant === BackgroundVariant.Lines;
  var bgColor = color ? color : defaultColors[variant];
  var path = isLines ? createGridLinesPath(scaledGap, size, bgColor) : createGridDotsPath(size * tScale, bgColor);
  return /*#__PURE__*/React.createElement("svg", {
    className: cc(['react-flow__background', 'react-flow__container', className]),
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: '100%',
      height: '100%'
    }),
    ref: ref
  }, patternId && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("pattern", {
    id: patternId,
    x: xOffset,
    y: yOffset,
    width: scaledGap,
    height: scaledGap,
    patternUnits: "userSpaceOnUse"
  }, path), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "url(#".concat(patternId, ")")
  })));
};

Background.displayName = 'Background';
var index = /*#__PURE__*/memo(Background);

export { index as default };
//# sourceMappingURL=index3.js.map
