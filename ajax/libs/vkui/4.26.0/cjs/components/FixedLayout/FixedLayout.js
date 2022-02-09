"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _SplitCol = require("../SplitCol/SplitCol");

var _TooltipContainer = require("../Tooltip/TooltipContainer");

var _dom = require("../../lib/dom");

var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["children", "style", "vertical", "getRootRef", "getRef", "filled"];

var FixedLayout = function FixedLayout(_ref) {
  var children = _ref.children,
      style = _ref.style,
      vertical = _ref.vertical,
      getRootRef = _ref.getRootRef,
      getRef = _ref.getRef,
      filled = _ref.filled,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(undefined),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      width = _React$useState2[0],
      setWidth = _React$useState2[1];

  var _useDOM = (0, _dom.useDOM)(),
      window = _useDOM.window;

  var _React$useContext = React.useContext(_SplitCol.SplitColContext),
      colRef = _React$useContext.colRef;

  var doResize = function doResize() {
    return setWidth(colRef !== null && colRef !== void 0 && colRef.current ? "".concat(colRef.current.offsetWidth, "px") : undefined);
  };

  React.useEffect(doResize, [colRef]);
  (0, _useGlobalEventListener.useGlobalEventListener)(window, "resize", doResize);
  return (0, _jsxRuntime.createScopedElement)(_TooltipContainer.TooltipContainer, (0, _extends2.default)({}, restProps, {
    fixed: true,
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("FixedLayout", platform), {
      "FixedLayout--filled": filled
    }, "FixedLayout--".concat(vertical)),
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      width: width
    })
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "FixedLayout__in",
    ref: getRef
  }, children));
}; // eslint-disable-next-line import/no-default-export


var _default = FixedLayout;
exports.default = _default;
//# sourceMappingURL=FixedLayout.js.map