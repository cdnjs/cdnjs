"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedLayout = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _platform = require("../../lib/platform");
var _vkjs = require("@vkontakte/vkjs");
var _SplitCol = require("../SplitCol/SplitCol");
var _TooltipContainer = require("../Tooltip/TooltipContainer");
var _dom = require("../../lib/dom");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _useExternRef = require("../../hooks/useExternRef");
var _excluded = ["children", "style", "vertical", "getRootRef", "getRef", "filled", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/FixedLayout
 */
var FixedLayout = function FixedLayout(_ref) {
  var children = _ref.children,
    style = _ref.style,
    vertical = _ref.vertical,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    filled = _ref.filled,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var ref = (0, _useExternRef.useExternRef)(getRootRef, getRef); // TODO: v6 удалить getRef
  var _React$useState = React.useState(undefined),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    width = _React$useState2[0],
    setWidth = _React$useState2[1];
  var _useDOM = (0, _dom.useDOM)(),
    window = _useDOM.window;
  var _React$useContext = React.useContext(_SplitCol.SplitColContext),
    colRef = _React$useContext.colRef;
  var doResize = function doResize() {
    if (colRef !== null && colRef !== void 0 && colRef.current) {
      var computedStyle = getComputedStyle(colRef.current);
      setWidth("".concat(colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight), "px"));
    } else {
      setWidth(undefined);
    }
  };
  React.useEffect(doResize, [colRef, platform]);
  (0, _useGlobalEventListener.useGlobalEventListener)(window, 'resize', doResize);
  return /*#__PURE__*/React.createElement(_TooltipContainer.TooltipContainer, (0, _extends2.default)({}, restProps, {
    fixed: true,
    ref: ref,
    className: (0, _vkjs.classNames)("vkuiFixedLayout", platform === _platform.Platform.IOS && "vkuiFixedLayout--ios", filled && "vkuiFixedLayout--filled", vertical && styles["FixedLayout--vertical-".concat(vertical)], className),
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      width: width
    })
  }), children);
};
exports.FixedLayout = FixedLayout;
var styles = {
  "FixedLayout--vertical-top": "vkuiFixedLayout--vertical-top",
  "FixedLayout--vertical-bottom": "vkuiFixedLayout--vertical-bottom"
};
//# sourceMappingURL=FixedLayout.js.map